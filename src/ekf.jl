abstract type AbstractExtendedKalmanFilter <: AbstractKalmanFilter end
@with_kw struct ExtendedKalmanFilter{KF <: KalmanFilter, F, G} <: AbstractExtendedKalmanFilter
    kf::KF
    dynamics::F
    measurement::G
end

"""
    ExtendedKalmanFilter(kf, dynamics, measurement)
    ExtendedKalmanFilter(dynamics, measurement, R1,R2,d0=MvNormal(Matrix(R1)); nu::Int, p = SciMLBase.NullParameters(), α = 1.0, check = true)

A nonlinear state estimator propagating uncertainty using linearization.

The constructor to the extended Kalman filter takes dynamics and measurement functions, and either covariance matrices, or a [`KalmanFilter`](@ref). If the former constructor is used, the number of inputs to the system dynamics, `nu`, must be explicitly provided with a keyword argument.

The filter will internally linearize the dynamics using ForwardDiff.

The dynamics and measurement function are on the following form
```
x(t+1) = dynamics(x, u, p, t) + w
y      = measurement(x, u, p, t) + e
```
where `w ~ N(0, R1)`, `e ~ N(0, R2)` and `x(0) ~ d0`

See also [`UnscentedKalmanFilter`](@ref) which is typically more accurate than `ExtendedKalmanFilter`. See [`KalmanFilter`](@ref) for detailed instructions on how to set up a Kalman filter `kf`.
"""
ExtendedKalmanFilter

function ExtendedKalmanFilter(dynamics, measurement, R1,R2,d0=MvNormal(Matrix(R1)); nu::Int, p = SciMLBase.NullParameters(), α = 1.0, check = true)
    nx = size(R1,1)
    T = eltype(R1)
    x = zeros(T, nx)
    u = zeros(T, nu)
    t = one(T)
    A = ForwardDiff.jacobian(x->dynamics(x,u,p,t), x)
    B = ForwardDiff.jacobian(u->dynamics(x,u,p,t), u)
    C = ForwardDiff.jacobian(x->measurement(x,u,p,t), x)
    D = ForwardDiff.jacobian(u->measurement(x,u,p,t), u)
    kf = KalmanFilter(A,B,C,D,R1,R2,d0; p, α, check)
    return ExtendedKalmanFilter(kf, dynamics, measurement)
end

function Base.getproperty(ekf::EKF, s::Symbol) where EKF <: AbstractExtendedKalmanFilter
    s ∈ fieldnames(EKF) && return getfield(ekf, s)
    return getproperty(getfield(ekf, :kf), s)
end

function Base.propertynames(ekf::EKF, private::Bool=false) where EKF <: AbstractExtendedKalmanFilter
    return (fieldnames(EKF)..., propertynames(ekf.kf, private)...)
end


function predict!(kf::AbstractExtendedKalmanFilter, u, p = parameters(kf), t::Integer = index(kf); R1 = get_mat(kf.R1, kf.x, u, p, t))
    @unpack x,R = kf
    A = ForwardDiff.jacobian(x->kf.dynamics(x,u,p,t), x)
    x .= kf.dynamics(x, u, p, t)
    if kf.α == 1
        R .= symmetrize(A*R*A') + R1
    else
        R .= symmetrize(kf.α*A*R*A') + R1
    end
    kf.t[] += 1
end

function correct!(kf::AbstractExtendedKalmanFilter, u, y, p = parameters(kf), t::Integer = index(kf); R2 = get_mat(kf.R2, kf.x, u, p, t))
    @unpack x,R = kf
    C = ForwardDiff.jacobian(x->kf.measurement(x,u,p,t), x)
    e  = y .- kf.measurement(x,u,p,t)
    S   = symmetrize(C*R*C') + R2
    Sᵪ  = cholesky(S)
    K   = (R*C')/Sᵪ
    x .+= vec(K*e)
    R  .= symmetrize((I - K*C)*R) # WARNING against I .- A
    ll = logpdf(MvNormal(PDMat(S, Sᵪ)), e)[]# - 1/2*logdet(S) # logdet is included in logpdf
    (; ll, e, S, Sᵪ, K)
end


function smooth(kf::AbstractExtendedKalmanFilter, u::AbstractVector, y::AbstractVector, p=parameters(kf))
    reset!(kf)
    T            = length(y)
    sol = forward_trajectory(kf, u, y, p)
    (; x,xt,R,Rt,ll) = sol
    xT           = similar(xt)
    RT           = similar(Rt)
    xT[end]      = xt[end]      |> copy
    RT[end]      = Rt[end]      |> copy
    for t = T-1:-1:1
        A = ForwardDiff.jacobian(x->kf.dynamics(x,u[t+1],p,t+1), xT[t+1])
        C     = Rt[t]*A'/R[t+1]
        xT[t] = xt[t] .+ C*(xT[t+1] .- x[t+1])
        RT[t] = Rt[t] .+ symmetrize(C*(RT[t+1] .- R[t+1])*C')
    end
    xT,RT,ll
end

sample_state(kf::AbstractExtendedKalmanFilter, p=parameters(kf); noise=true) = noise ? rand(kf.d0) : mean(kf.d0)
sample_state(kf::AbstractExtendedKalmanFilter, x, u, p, t; noise=true) = kf.dynamics(x, u, p, t) .+ noise*rand(MvNormal(get_mat(kf.R1, x, u, p, t)))
sample_measurement(kf::AbstractExtendedKalmanFilter, x, u, p, t; noise=true) = kf.measurement(x, u, p, t) .+ noise*rand(MvNormal(get_mat(kf.R2, x, u, p, t)))
measurement(kf::AbstractExtendedKalmanFilter) = kf.measurement
dynamics(kf::AbstractExtendedKalmanFilter) = kf.dynamics