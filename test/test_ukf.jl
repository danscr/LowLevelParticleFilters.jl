using LowLevelParticleFilters
import LowLevelParticleFilters.resample
using Test, Random, LinearAlgebra, Statistics, StaticArrays, Distributions, Plots
Random.seed!(0)

mvnormal(d::Int, σ::Real) = MvNormal(LinearAlgebra.Diagonal(fill(float(σ) ^ 2, d)))
mvnormal(μ::AbstractVector{<:Real}, σ::Real) = MvNormal(μ, float(σ) ^ 2 * I)


## Standard UKF

eye(n) = Matrix{Float64}(I,n,n)
nx = 2 # Dinemsion of state
nu = 2 # Dinemsion of input
ny = 2 # Dinemsion of measurements

d0 = mvnormal(randn(nx),2.0)   # Initial state Distribution
du = mvnormal(2,1) # Control input distribution

# Define random linenar state-space system
Tr = randn(nx,nx)
A = SA[0.99 0.1; 0 0.2]
B = @SMatrix randn(nx,nu)
C = SMatrix{ny,ny}(eye(ny))
# C = SMatrix{p,n}([1 1])

dynamics(x,u,t) = A*x .+ B*u
measurement(x,u,t) = C*x

T    = 200 # Number of time steps
kf   = KalmanFilter(A, B, C, 0, eye(nx), eye(ny), d0)
ukf  = UnscentedKalmanFilter(dynamics, measurement, eye(nx), eye(ny), d0)
x,u,y = LowLevelParticleFilters.simulate(kf,T,du) # Simuate trajectory using the model in the filter
@test_nowarn LowLevelParticleFilters.simulate(ukf,T,du)
tosvec(y) = reinterpret(SVector{length(y[1]),Float64}, reduce(hcat,y))[:] |> copy
x,u,y = tosvec.((x,u,y))


reskf = forward_trajectory(kf, u, y) # filtered, prediction, pred
resukf = forward_trajectory(ukf, u, y)

norm(mean(x .- reskf[1]))
norm(mean(x .- resukf[1]))

norm(mean(x .- reskf[2]))
norm(mean(x .- resukf[2]))
@test norm(mean(x .- reskf[2])) < norm(mean(x .- reskf[1])) # Filtered should be better than prediction
@test norm(mean(x .- resukf[2])) < norm(mean(x .- resukf[1]))
@test norm(mean(x .- reskf[2])) ≈ norm(mean(x .- resukf[2])) atol=5e-2
# @test norm(mean(x .- reskf[2])) < norm(mean(x .- resukf[2]))  # KF should be better than UKF
# @test norm(mean(x .- reskf[1])) < norm(mean(x .- resukf[1]))  # KF should be better than UKF
@test norm(mean(x .- reskf[2])) < 0.2


## DAE UKF =====================================================================
"A pendulum in DAE form"
function pend(state, f, t=0)
    x,y,u,v,λ = state
    g = 9.82
    SA[
        u
        v
        -λ*x + f[1]
        -λ*y - g + f[2]
        # x^2 + y^2 - 1 # Index 3, position constraint
        # x*u + y*v # index 2, tangential velocity
        u^2 + v^2 - λ*(x^2 + y^2) - g*y + x*f[1] + y*f[2] # index 1, centripetal acceleration
    ]
end

nx = 4 # Dinemsion of differential state
nu = 2 # Dinemsion of input
ny = 2 # Dinemsion of measurements
const Ts = 0.001

d0 = mvnormal([1,0,0,0],0.1)   # Initial state Distribution
du = mvnormal(2,0.1) # Control input distribution
xz0 = [mean(d0); 0]
u0 = zeros(nu)

get_x(xz) = SA[xz[1],xz[2],xz[3],xz[4]]
get_z(xz) = SA[xz[5]]
get_x_z(xz) = get_x(xz), get_z(xz)
build_xz(x, z) = [x; z]
g((x,y,u,v), (λ,), f, t) = SA[u^2 + v^2 - λ*(x^2 + y^2) - 9.82*y + x*f[1] + y*f[2]]
g(xz, u, t) = g(get_x(xz), get_z(xz), u, t)

# Discretization of the continuous-time dynamics, we use a naive Euler approximation, real-world use should use a proper DAE solver, for example using the integrator interface in OrdinaryDiffEq.jl
function dynamics(xz,u,t)
    der = pend(xz,u,t)
    xp = get_x(xz) + Ts*get_x(der) # Euler step
    xzp = build_xz(xp, get_z(xz))
    LowLevelParticleFilters.get_xz(get_x_z, build_xz, g, xzp, u, t) # Adjust z
end
measurement(x,u,t) = x[1:2]

u0 = randn(nu)
xzp = dynamics(xz0,u0,0)
@test g(xzp, u0, 0)[] ≈ 0 atol=0.01

ukf0 = UnscentedKalmanFilter(dynamics, measurement, 0.000001eye(nx), 1eye(ny), d0)
ukf  = LowLevelParticleFilters.DAEUnscentedKalmanFilter(ukf0; g, get_x_z, build_xz, xz0, nu=nu)

let u0 = zeros(nu)
    xzp = LowLevelParticleFilters.get_xz(ukf, xz0, u0, 0)
    @test xzp[end] ≈ 0 atol=0.01 # zero centripetal acceleration at the point (x,y) = (1,0)
    @test g(xzp, u0, 0)[] ≈ 0 atol=0.01

    xzp = LowLevelParticleFilters.get_xz(ukf, randn(nx+1), u0, 0)
    @test g(xzp, u0, 0)[] ≈ 0 atol=0.01
end

t = 0:Ts:3
U = [sin.(t.^2) sin.(reverse(t).^2)]
u = U |> eachrow .|> vcat
while true
    global x, u, y
    x,u,y = LowLevelParticleFilters.simulate(ukf, 1 .* u)
    norm(x) < 1000 && break
end

tosvec(y) = reinterpret(SVector{length(y[1]),Float64}, reduce(hcat,y))[:] |> copy
x,u,y = tosvec.((x,u,y))

state(ukf) .+= 5 .* randn(nx+1)

xf,xft,R,Rt,ll = forward_trajectory(ukf, u, y)

@test all(zip(R,Rt)) do (R,Rt)
    det(Rt) < det(R)
end # test that the covariance decreases by the measurement update
    

@test norm(x[10:end] .- xf[10:end]) / norm(x) < 0.1
@test norm(x[10:end] .- xft[10:end]) / norm(x) < 0.1

if isinteractive()
    plot(reduce(hcat, x)', layout=length(x[1]))
    plot!(reduce(hcat, xf)')
    plot!(reduce(hcat, xft)')
end