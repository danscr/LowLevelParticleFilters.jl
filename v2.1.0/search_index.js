var documenterSearchIndex = {"docs":
[{"location":"api/#Exported-functions-and-types-1","page":"API","title":"Exported functions and types","text":"","category":"section"},{"location":"api/#Index-1","page":"API","title":"Index","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"","category":"page"},{"location":"api/#","page":"API","title":"API","text":"Modules = [LowLevelParticleFilters]\nPrivate = false","category":"page"},{"location":"api/#LowLevelParticleFilters.AdvancedParticleFilter-Tuple{Integer, Function, Function, Any, Any, Any}","page":"API","title":"LowLevelParticleFilters.AdvancedParticleFilter","text":"AdvancedParticleFilter(Nparticles, dynamics, measurement, measurement_likelihood, dynamics_density, initial_density; kwargs...)\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.ExtendedKalmanFilter","page":"API","title":"LowLevelParticleFilters.ExtendedKalmanFilter","text":"ExtendedKalmanFilter(kf, dynamics, measurement)\n\nAn extended Kalman filter takes a standard Kalman filter as well as dynamics and measurement functions. The filter will linearize the dynamics using ForwardDiff.\n\n\n\n\n\n","category":"type"},{"location":"api/#LowLevelParticleFilters.KalmanFilter","page":"API","title":"LowLevelParticleFilters.KalmanFilter","text":"KalmanFilter(A,B,C,D,R1,R2,d0=MvNormal(R1))\n\nThe matrices A,B,C,D define the dynamics\n\nx' = Ax + Bu + w\ny  = Cx + Du + e\n\nwhere w ~ N(0, R1), e ~ N(0, R2) and x(0) ~ d0\n\n\n\n\n\n","category":"type"},{"location":"api/#LowLevelParticleFilters.ParticleFilter-Tuple{Integer, Function, Function, Any, Any, Any}","page":"API","title":"LowLevelParticleFilters.ParticleFilter","text":"ParticleFilter(num_particles, dynamics, measurement, dynamics_density, measurement_density, initial_density)\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.SigmaFilter-NTuple{6, Any}","page":"API","title":"LowLevelParticleFilters.SigmaFilter","text":"SigmaFilter(N,dynamics,measurement,measurement_likelihood,df,d0)\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.TupleProduct","page":"API","title":"LowLevelParticleFilters.TupleProduct","text":"TupleProduct(v::NTuple{N,UnivariateDistribution})\n\nCreate a product distribution where the individual distributions are stored in a tuple. Supports mixed/hybrid Continuous and Discrete distributions\n\n\n\n\n\n","category":"type"},{"location":"api/#LowLevelParticleFilters.UnscentedKalmanFilter","page":"API","title":"LowLevelParticleFilters.UnscentedKalmanFilter","text":"UnscentedKalmanFilter(dynamics,measurement,R1,R2,d0=MvNormal(Matrix(R1)))\n\n\n\n\n\n","category":"type"},{"location":"api/#LowLevelParticleFilters.commandplot-Tuple{Any, Any, Any}","page":"API","title":"LowLevelParticleFilters.commandplot","text":"commandplot(pf, u, y; kwargs...)\n\nProduce a helpful plot. For customization options (kwargs...), see ?pplot. After each time step, a command from the user is requested.\n\nq: quit\ns n: step n steps\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.correct!","page":"API","title":"LowLevelParticleFilters.correct!","text":" ll, e = correct!(f, u, y, t = index(f))\n\nUpdate state/covariance/weights based on measurement y,  returns loglikelihood and prediction error (the error is always 0 for particle filters).\n\n\n\n\n\n","category":"function"},{"location":"api/#LowLevelParticleFilters.debugplot-Tuple{Any, Any, Any}","page":"API","title":"LowLevelParticleFilters.debugplot","text":"debugplot(pf, u, y; runall=false, kwargs...)\n\nProduce a helpful plot. For customization options (kwargs...), see ?pplot.\n\nrunall=false: if true, runs all time steps befor displaying (faster), if false, displays the plot after each time step.\n\nThe generated plot becomes quite heavy. Initially, try limiting your input to 100 time steps to verify that it doesn't crash.\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.densityplot","page":"API","title":"LowLevelParticleFilters.densityplot","text":"densityplot(x,[w])\n\nPlot (weighted) particles densities\n\n\n\n\n\n","category":"function"},{"location":"api/#LowLevelParticleFilters.dimensiondensity","page":"API","title":"LowLevelParticleFilters.dimensiondensity","text":"dimensiondensity(pf,x,we,y, dimension, nbinsy=30, xreal=nothing)\n\nSame as trajectorydensity but only plots subplot dimension.\n\n\n\n\n\n","category":"function"},{"location":"api/#LowLevelParticleFilters.forward_trajectory-Tuple{Any, AbstractVector{T} where T, AbstractVector{T} where T}","page":"API","title":"LowLevelParticleFilters.forward_trajectory","text":"x,w,we,ll = forward_trajectory(pf, u::AbstractVector, y::AbstractVector)\n\nRun the particle filter for a sequence of inputs and measurements. Return particles, weights, expweights and loglikelihood\n\nIf MonteCarloMeasurements.jl is loaded, you may transform the output particles to Matrix{MonteCarloMeasurements.Particles} using Particles(x,we). Internally, the particles are then resampled such that they all have unit weight. This is conventient for making use of the plotting facilities of MonteCarloMeasurements.jl.\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.forward_trajectory-Tuple{LowLevelParticleFilters.AbstractKalmanFilter, AbstractVector{T} where T, AbstractVector{T} where T}","page":"API","title":"LowLevelParticleFilters.forward_trajectory","text":"x,xt,R,Rt,ll = forward_trajectory(kf::AbstractKalmanFilter, u::Vector, y::Vector)\n\nRun a Kalman filter forward\n\nReturns:\n\nx: predictions\nxt: filtered estimates\nR: predicted covariance matrices\nRt: filter covariances\nll: loglik\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.log_likelihood_fun-Tuple{Any, Vector{var\"#s182\"} where var\"#s182\"<:Distributions.Distribution, Any, Any}","page":"API","title":"LowLevelParticleFilters.log_likelihood_fun","text":"ll(θ) = log_likelihood_fun(filter_from_parameters(θ::Vector)::Function, priors::Vector{Distribution}, u, y)\n\nreturns function θ -> p(y|θ)p(θ)\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.loglik-Tuple{LowLevelParticleFilters.AbstractFilter, Any, Any}","page":"API","title":"LowLevelParticleFilters.loglik","text":"ll = loglik(filter,u,y)\n\nCalculate loglikelihood for entire sequences u,y\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.logsumexp!","page":"API","title":"LowLevelParticleFilters.logsumexp!","text":"ll = logsumexp!(w, we [, maxw])\n\nNormalizes the weight vector w and returns the weighted log-likelihood\n\nhttps://arxiv.org/pdf/1412.8695.pdf eq 3.8 for p(y) https://discourse.julialang.org/t/fast-logsumexp/22827/7?u=baggepinnen for stable logsumexp\n\n\n\n\n\n","category":"function"},{"location":"api/#LowLevelParticleFilters.mean_trajectory-Tuple{Any, Vector{T} where T, Vector{T} where T}","page":"API","title":"LowLevelParticleFilters.mean_trajectory","text":"x,ll = mean_trajectory(pf, u::Vector{Vector}, y::Vector{Vector})\n\nThis Function resets the particle filter to the initial state distribution upon start\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.metropolis","page":"API","title":"LowLevelParticleFilters.metropolis","text":"metropolis(ll::Function(θ), R::Int, θ₀::Vector, draw::Function(θ) = naive_sampler(θ₀))\n\nPerforms MCMC sampling using the marginal Metropolis (-Hastings) algorithm draw = θ -> θ' samples a new parameter vector given an old parameter vector. The distribution must be symmetric, e.g., a Gaussian. R is the number of iterations. See log_likelihood_fun\n\nExample:\n\nfilter_from_parameters(θ) = ParticleFilter(N, dynamics, measurement, MvNormal(n,exp(θ[1])), MvNormal(p,exp(θ[2])), d0)\npriors = [Normal(0,0.1),Normal(0,0.1)]\nll     = log_likelihood_fun(filter_from_parameters,priors,u,y,1)\nθ₀ = log.([1.,1.]) # Initial point\ndraw = θ -> θ .+ rand(MvNormal(0.1ones(2))) # Function that proposes new parameters (has to be symmetric)\nburnin = 200 # If using threaded call, provide number of burnin iterations\n# @time theta, lls = metropolis(ll, 2000, θ₀, draw) # Run single threaded\n# thetam = reduce(hcat, theta)'\n@time thetalls = LowLevelParticleFilters.metropolis_threaded(burnin, ll, 5000, θ₀, draw) # run on all threads, will provide (2000-burnin)*nthreads() samples\nhistogram(exp.(thetalls[:,1:2]), layout=3)\nplot!(thetalls[:,3], subplot=3) # if threaded call, log likelihoods are in the last column\n\n\n\n\n\n","category":"function"},{"location":"api/#LowLevelParticleFilters.predict!","page":"API","title":"LowLevelParticleFilters.predict!","text":"predict!(f, u, t = index(f))\n\nMove filter state forward in time using dynamics equation and input vector u.\n\n\n\n\n\n","category":"function"},{"location":"api/#LowLevelParticleFilters.reset!-Tuple{LowLevelParticleFilters.AbstractParticleFilter}","page":"API","title":"LowLevelParticleFilters.reset!","text":"Reset the filter to initial state and covariance/distribution\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.simulate-Tuple{LowLevelParticleFilters.AbstractFilter, Int64, Distributions.Distribution}","page":"API","title":"LowLevelParticleFilters.simulate","text":"x,u,y = simulate(f::AbstractFilter, T::Int, du::Distribution, [N])\nx,u,y = simulate(f::AbstractFilter, u)\n\nSimulate dynamical system forward in time, returns state sequence, inputs and measurements du is a distribution of random inputs.\n\nIf MonteCarloMeasurements.jl is loaded, the argument N::Int can be supplied, in which case N simulations are done and the result is returned in the form of Vector{MonteCarloMeasurements.Particles}.\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.smooth-Tuple{KalmanFilter, AbstractVector{T} where T, AbstractVector{T} where T}","page":"API","title":"LowLevelParticleFilters.smooth","text":"xT,RT,ll = smooth(kf::KalmanFilter, u::Vector, y::Vector)\n\nReturns smoothed estimates of state x and covariance R given all input output data u,y\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.smooth-Tuple{LowLevelParticleFilters.AbstractParticleFilter, Any, Any, Any, Any, Any, Any, Any}","page":"API","title":"LowLevelParticleFilters.smooth","text":"xb,ll = smooth(pf, M, u, y)\n\nPerform particle smoothing using forward-filtering, backward simulation. Return smoothed particles and loglikelihood. See also smoothed_trajs, smoothed_mean, smoothed_cov\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.smoothed_cov-Tuple{Any}","page":"API","title":"LowLevelParticleFilters.smoothed_cov","text":"smoothed_cov(xb)\n\nHelper function to calculate the covariance of smoothed particle trajectories\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.smoothed_mean-Tuple{Any}","page":"API","title":"LowLevelParticleFilters.smoothed_mean","text":"smoothed_mean(xb)\n\nHelper function to calculate the mean of smoothed particle trajectories\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.smoothed_trajs-Tuple{Any}","page":"API","title":"LowLevelParticleFilters.smoothed_trajs","text":"smoothed_trajs(xb)\n\nHelper function to get particle trajectories as a 3-dimensions array (N,M,T) instead of matrix of vectors.\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.trajectorydensity","page":"API","title":"LowLevelParticleFilters.trajectorydensity","text":"trajectorydensity(pf,x,we,y, nbinsy=30, xreal=nothing)\n\nPlots particle densities along trajectory. See the readme for an example.\n\n\n\n\n\n","category":"function"},{"location":"api/#LowLevelParticleFilters.update!","page":"API","title":"LowLevelParticleFilters.update!","text":"ll, e = update!(f::AbstractFilter, u, y, t = index(f))\n\nPerform one step of predict! and correct!, returns loglikelihood and prediction error\n\n\n\n\n\n","category":"function"},{"location":"api/#LowLevelParticleFilters.weigthed_cov-Tuple{Any, Any}","page":"API","title":"LowLevelParticleFilters.weigthed_cov","text":"Similar to weigthed_mean, but returns covariances\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.weigthed_mean-Tuple{Any, AbstractVector{T} where T}","page":"API","title":"LowLevelParticleFilters.weigthed_mean","text":"x̂ = weigthed_mean(x,we)\n\nCalculated weighted mean of particle trajectories. we are expweights.\n\n\n\n\n\n","category":"method"},{"location":"api/#LowLevelParticleFilters.weigthed_mean-Tuple{Any}","page":"API","title":"LowLevelParticleFilters.weigthed_mean","text":"x̂ = weigthed_mean(pf)\nx̂ = weigthed_mean(s::PFstate)\n\n\n\n\n\n","category":"method"},{"location":"distributions/#High-performance-Distributions-1","page":"High-performance distributions","title":"High performance Distributions","text":"","category":"section"},{"location":"distributions/#","page":"High-performance distributions","title":"High-performance distributions","text":"When using LowLevelParticleFilters, a number of methods related to distributions are defined for static arrays, making logpdf etc. faster. We also provide a new kind of distribution: TupleProduct <: MultivariateDistribution that behaves similarly to the Product distribution. The TupleProduct however stores the individual distributions in a tuple, has compile-time known length and supports Mixed <: ValueSupport, meaning that it can be a product of both Continuous and Discrete dimensions, somthing not supported by the standard Product. Example","category":"page"},{"location":"distributions/#","page":"High-performance distributions","title":"High-performance distributions","text":"using BenchmarkTools, LowLevelParticleFilters, Distributions\ndt = TupleProduct((Normal(0,2), Normal(0,2), Binomial())) # Mixed value support","category":"page"},{"location":"distributions/#","page":"High-performance distributions","title":"High-performance distributions","text":"A small benchmark","category":"page"},{"location":"distributions/#","page":"High-performance distributions","title":"High-performance distributions","text":"```julia\nsv = @SVector randn(2)\nd = Product([Normal(0,2), Normal(0,2)])\ndt = TupleProduct((Normal(0,2), Normal(0,2)))\ndm = MvNormal(2, 2)\n@btime logpdf($d,$(Vector(sv))) # 32.449 ns (1 allocation: 32 bytes)\n@btime logpdf($dt,$(Vector(sv))) # 21.141 ns (0 allocations: 0 bytes)\n@btime logpdf($dm,$(Vector(sv))) # 48.745 ns (1 allocation: 96 bytes)","category":"page"},{"location":"distributions/#","page":"High-performance distributions","title":"High-performance distributions","text":"@btime logpdf($d,$sv) # 22.651 ns (0 allocations: 0 bytes)\n@btime logpdf($dt,$sv) # 0.021 ns (0 allocations: 0 bytes)\n@btime logpdf($dm,$sv) # 0.021 ns (0 allocations: 0 bytes)","category":"page"},{"location":"distributions/#","page":"High-performance distributions","title":"High-performance distributions","text":"Without loading LowLevelParticleFilters, the timing for the native distributions are the following","category":"page"},{"location":"distributions/#","page":"High-performance distributions","title":"High-performance distributions","text":"@btime logpdf($d,$sv) # 32.621 ns (1 allocation: 32 bytes)\n@btime logpdf($dm,$sv) # 46.415 ns (1 allocation: 96 bytes)\n```","category":"page"},{"location":"benchmark/#Benchmark-test-1","page":"Benchmark","title":"Benchmark test","text":"","category":"section"},{"location":"benchmark/#","page":"Benchmark","title":"Benchmark","text":"To see how the performance varies with the number of particles, we simulate several times. The following code simulates the system and performs filtering using the simulated measuerments. We do this for varying number of time steps and varying number of particles.","category":"page"},{"location":"benchmark/#","page":"Benchmark","title":"Benchmark","text":"function run_test()\n    particle_count = [10, 20, 50, 100, 200, 500, 1000]\n    time_steps = [20, 100, 200]\n    RMSE = zeros(length(particle_count),length(time_steps)) # Store the RMS errors\n    propagated_particles = 0\n    t = @elapsed for (Ti,T) = enumerate(time_steps)\n        for (Ni,N) = enumerate(particle_count)\n            montecarlo_runs = 2*maximum(particle_count)*maximum(time_steps) ÷ T ÷ N\n            E = sum(1:montecarlo_runs) do mc_run\n                pf = ParticleFilter(N, dynamics, measurement, df, dg, d0) # Create filter\n                u = @SVector randn(2)\n                x = SVector{2,Float64}(rand(rng, d0))\n                y = SVector{2,Float64}(sample_measurement(pf,x,u,1))\n                error = 0.0\n                @inbounds for t = 1:T-1\n                    pf(u, y) # Update the particle filter\n                    x = dynamics(x,u,t) + SVector{2,Float64}(rand(rng, df)) # Simulate the true dynamics and add some noise\n                    y = SVector{2,Float64}(sample_measurement(pf,x,u,t)) # Simulate a measuerment\n                    u = @SVector randn(2) # draw a random control input\n                    error += sum(abs2,x-weigthed_mean(pf))\n                end # t\n                √(error/T)\n            end # MC\n            RMSE[Ni,Ti] = E/montecarlo_runs\n            propagated_particles += montecarlo_runs*N*T\n            @show N\n        end # N\n        @show T\n    end # T\n    println(\"Propagated $propagated_particles particles in $t seconds for an average of $(propagated_particles/t/1000) particles per millisecond\")\n    return RMSE\nend\n\n@time RMSE = run_test()","category":"page"},{"location":"benchmark/#","page":"Benchmark","title":"Benchmark","text":"Propagated 8400000 particles in 2.193401766 seconds for an average of 3829.6677472448064 particles per millisecond","category":"page"},{"location":"benchmark/#","page":"Benchmark","title":"Benchmark","text":"We then plot the results","category":"page"},{"location":"benchmark/#","page":"Benchmark","title":"Benchmark","text":"time_steps     = [20, 100, 200]\nparticle_count = [10, 20, 50, 100, 200, 500, 1000]\nnT             = length(time_steps)\nleg            = reshape([\"$(time_steps[i]) time steps\" for i = 1:nT], 1,:)\nplot(particle_count,RMSE,xscale=:log10, ylabel=\"RMS errors\", xlabel=\" Number of particles\", lab=leg)\ngui()","category":"page"},{"location":"benchmark/#","page":"Benchmark","title":"Benchmark","text":"(Image: window)","category":"page"},{"location":"#LowLevelParticleFilters-1","page":"Home","title":"LowLevelParticleFilters","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"(Image: CI) (Image: codecov)","category":"page"},{"location":"#Types-1","page":"Home","title":"Types","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"We provide a number of filter types","category":"page"},{"location":"#","page":"Home","title":"Home","text":"ParticleFilter: This filter is simple to use and assumes that both dynamics noise and measurement noise are additive.\nAuxiliaryParticleFilter: This filter is identical to ParticleFilter, but uses a slightly different proposal mechanism for new particles.\nAdvancedParticleFilter: This filter gives you more flexibility, at the expense of having to define a few more functions. More instructions on this type below.\nKalmanFilter. A standard Kalman filter. Has the same features as the particle filters, but is restricted to linear dynamics (possibly time varying) and Gaussian noise.\nExtendedKalmanFilter: For nonlinear systems, the EKF runs a regular Kalman filter on linearized dynamics. Uses ForwardDiff.jl for linearization. The noise model must be Gaussian.\nUnscentedKalmanFilter: The Unscented kalman filter often performs slightly better than the Extended Kalman filter but may be slightly more computationally expensive. The UKF handles nonlinear dynamics and measurement model, but still requires an additive Gaussian noise model.\nDAEUnscentedKalmanFilter: An Unscented Kalman filter for differential-algebraic systems (DAE).","category":"page"},{"location":"#Functionality-1","page":"Home","title":"Functionality","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Filtering\nSmoothing (smooth)\nParameter estimation using ML or PMMH (Particle Marginal Metropolis Hastings)","category":"page"},{"location":"#Particle-filter-1","page":"Home","title":"Particle filter","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Defining a particle filter is straightforward, one must define the distribution of the noise df in the dynamics function, dynamics(x,u,t) and the noise distribution dg in the measurement function measurement(x,u,t). The distribution of the initial state d0 must also be provided. An example for a linear Gaussian system is given below.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"using LowLevelParticleFilters, LinearAlgebra, StaticArrays, Distributions, Plots","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Define problem","category":"page"},{"location":"#","page":"Home","title":"Home","text":"n = 2   # Dimension of state\nm = 2   # Dimension of input\np = 2   # Dimension of measurements\nN = 500 # Number of particles\n\nconst dg = MvNormal(p,1.0)          # Measurement noise Distribution\nconst df = MvNormal(n,1.0)          # Dynamics noise Distribution\nconst d0 = MvNormal(randn(n),2.0)   # Initial state Distribution","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Define random linear state-space system","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Tr = randn(n,n)\nconst A = SMatrix{n,n}(Tr*diagm(0=>LinRange(0.5,0.95,n))/Tr)\nconst B = @SMatrix randn(n,m)\nconst C = @SMatrix randn(p,n)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Next, we define the dynamics and measurement equations, they both take the signature (x,u,t) = (state, input, time) ","category":"page"},{"location":"#","page":"Home","title":"Home","text":"dynamics(x,u,t) = A*x .+ B*u\nmeasurement(x,u,t) = C*x\nvecvec_to_mat(x) = copy(reduce(hcat, x)') # Helper function","category":"page"},{"location":"#","page":"Home","title":"Home","text":"We are now ready to define and use a filter","category":"page"},{"location":"#","page":"Home","title":"Home","text":"pf = ParticleFilter(N, dynamics, measurement, df, dg, d0)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"With the filter in hand, we can simulate from its dynamics and query some properties","category":"page"},{"location":"#","page":"Home","title":"Home","text":"xs,u,y = simulate(pf,200,df) # We can simulate the model that the pf represents\npf(u[1], y[1])               # Perform one filtering step using input u and measurement y\nparticles(pf)                # Query the filter for particles, try weights(pf) or expweights(pf) as well\nx̂ = weigthed_mean(pf)        # using the current state","category":"page"},{"location":"#","page":"Home","title":"Home","text":"If you want to perform filtering using vectors of inputs and measurements, try any of the functions","category":"page"},{"location":"#","page":"Home","title":"Home","text":"x,w,we,ll = forward_trajectory(pf, u, y) # Filter whole vectors of signals\nx̂,ll = mean_trajectory(pf, u, y)\ntrajectorydensity(pf,x,w,u,y,xreal=xs, markersize=2)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"If MonteCarloMeasurements.jl is loaded, you may transform the output particles to Matrix{MonteCarloMeasurements.Particles} with the layout T × n_states using Particles(x,we). Internally, the particles are then resampled such that they all have unit weight. This is conventient for making use of the plotting facilities of MonteCarloMeasurements.jl.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"For a full usage example, see the benchmark section below or example_lineargaussian.jl","category":"page"},{"location":"#Smoothing-1","page":"Home","title":"Smoothing","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"We also provide a particle smoother, based on forward filtering, backward simulation (FFBS)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"N     = 2000 # Number of particles\nT     = 200  # Number of time steps\nM     = 100  # Number of smoothed backwards trajectories\npf    = ParticleFilter(N, dynamics, measurement, df, dg, d0)\ndu    = MvNormal(2,1)     # Control input distribution\nx,u,y = simulate(pf,T,du) # Simulate trajectory using the model in the filter\ntosvec(y) = reinterpret(SVector{length(y[1]),Float64}, reduce(hcat,y))[:] |> copy\nx,u,y = tosvec.((x,u,y))\n\nxb,ll = smooth(pf, M, u, y) # Sample smooting particles\nxbm   = smoothed_mean(xb)   # Calculate the mean of smoothing trajectories\nxbc   = smoothed_cov(xb)    # And covariance\nxbt   = smoothed_trajs(xb)  # Get smoothing trajectories\nxbs   = [diag(xbc) for xbc in xbc] |> vecvec_to_mat .|> sqrt\nplot(xbm', ribbon=2xbs, lab=\"PF smooth\")\nplot!(vecvec_to_mat(x), l=:dash, lab=\"True\")","category":"page"},{"location":"#","page":"Home","title":"Home","text":"We can plot the particles themselves as well","category":"page"},{"location":"#","page":"Home","title":"Home","text":"downsample = 5\nplot(vecvec_to_mat(x), l=(4,), layout=(2,1), show=false)\nscatter!(xbt[1, 1:downsample:end, :]', subplot=1, show=false, m=(1,:black, 0.5), lab=\"\")\nscatter!(xbt[2, 1:downsample:end, :]', subplot=2, m=(1,:black, 0.5), lab=\"\")","category":"page"},{"location":"#Kalman-filter-1","page":"Home","title":"Kalman filter","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"A Kalman filter is easily created using the constructor. Many of the functions defined for particle filters, are defined also for Kalman filters, e.g.:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"eye(n) = Matrix{Float64}(I,n,n)\nkf     = KalmanFilter(A, B, C, 0, eye(n), eye(p), MvNormal([1.,1.]))\nukf    = UnscentedKalmanFilter(dynamics, measurement, eye(n), eye(p), MvNormal([1.,1.]))\nxf,xt,R,Rt,ll = forward_trajectory(kf, u, y) # filtered, prediction, pred cov, filter cov, loglik\nxT,R,lls = smooth(kf, u, y) # Smoothed state, smoothed cov, loglik","category":"page"},{"location":"#","page":"Home","title":"Home","text":"It can also be called in a loop like the pf above","category":"page"},{"location":"#","page":"Home","title":"Home","text":"for t = 1:T\n    kf(u,y) # Performs both correct and predict!!\n    # alternatively\n    ll += correct!(kf, y, t) # Returns loglik\n    x   = state(kf)\n    R   = covariance(kf)\n    predict!(kf, u, t)\nend","category":"page"},{"location":"#Unscented-Kalman-Filter-1","page":"Home","title":"Unscented Kalman Filter","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The UKF takes the same arguments as a regular KalmanFilter, but the matrices definiting the dynamics are replaced by two functions, dynamics and measurement, working in the same way as for the ParticleFilter above.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"ukf    = UnscentedKalmanFilter(dynamics, measurement, eye(n), eye(p), MvNormal([1.,1.]))","category":"page"},{"location":"#UKF-for-DAE-systems-1","page":"Home","title":"UKF for DAE systems","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"See the docstring for DAEUnscentedKalmanFilter or the test file.","category":"page"},{"location":"#Troubleshooting-1","page":"Home","title":"Troubleshooting","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Tuning a particle filter can be quite the challenge. To assist with this, we provide som visualization tools","category":"page"},{"location":"#","page":"Home","title":"Home","text":"debugplot(pf,u[1:30],y[1:30], runall=true, xreal=x[1:30])","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The plot displays all states and all measurements. The heatmap in the background represents the weighted particle distributions per time step. For the measurement sequences, the heatmap represent the distibutions of predicted measurements. The blue dots corresponds to measured values. In this case, we simulated the data and we had access to states as well, if we do not have that, just omit xreal. You can also manually step through the time-series using","category":"page"},{"location":"#","page":"Home","title":"Home","text":"commandplot(pf,u,y; kwargs...)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"For options to the debug plots, see ?pplot.","category":"page"},{"location":"#Parameter-estimation-1","page":"Home","title":"Parameter estimation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"We provide som basic functionality for maximum likelihood estimation and MAP estimation","category":"page"},{"location":"#ML-estimation-1","page":"Home","title":"ML estimation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Plot likelihood as function of the variance of the dynamics noise","category":"page"},{"location":"#","page":"Home","title":"Home","text":"svec = exp10.(LinRange(-1.5,1.5,60))\nllspf = map(svec) do s\n    df = MvNormal(n,s)\n    pfs = ParticleFilter(2000, dynamics, measurement, df, dg, d0)\n    loglik(pfs,u,y)\nend\nplot( svec, llspf,\n    xscale = :log10,\n    title = \"Log-likelihood\",\n    xlabel = \"Dynamics noise standard deviation\",\n    lab = \"PF\",\n)\nvline!([svec[findmax(llspf)[2]]], l=(:dash,:blue), primary=false)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"We can do the same with a Kalman filter","category":"page"},{"location":"#","page":"Home","title":"Home","text":"eye(n) = Matrix{Float64}(I,n,n)\nllskf = map(svec) do s\n    kfs = KalmanFilter(A, B, C, 0, s^2*eye(n), eye(p), d0)\n    loglik(kfs,u,y)\nend\nplot!(svec, llskf, yscale=:identity, xscale=:log10, lab=\"Kalman\", c=:red)\nvline!([svec[findmax(llskf)[2]]], l=(:dash,:red), primary=false)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"as we can see, the result is quite noisy due to the stochastic nature of particle filtering.","category":"page"},{"location":"#Smoothing-using-KF-1","page":"Home","title":"Smoothing using KF","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"kf = KalmanFilter(A, B, C, 0, eye(n), eye(p), MvNormal(2,1))\nxf,xh,R,Rt,ll = forward_trajectory(kf, u, y) # filtered, prediction, pred cov, filter cov, loglik\nxT,R,lls = smooth(kf, u, y) # Smoothed state, smoothed cov, loglik","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Plot and compare PF and KF","category":"page"},{"location":"#","page":"Home","title":"Home","text":"plot(vecvec_to_mat(xT), lab=\"Kalman smooth\", layout=2)\nplot!(xbm', lab=\"pf smooth\")\nplot!(vecvec_to_mat(x), lab=\"true\")","category":"page"},{"location":"#MAP-estiamtion-1","page":"Home","title":"MAP estiamtion","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"To solve a MAP estimation problem, we need to define a function that takes a parameter vector and returns a particle filter","category":"page"},{"location":"#","page":"Home","title":"Home","text":"filter_from_parameters(θ, pf = nothing) = ParticleFilter(\n    N,\n    dynamics,\n    measurement,\n    MvNormal(n, exp(θ[1])),\n    MvNormal(p, exp(θ[2])),\n    d0,\n)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The call to exp on the parameters is so that we can define log-normal priors","category":"page"},{"location":"#","page":"Home","title":"Home","text":"priors = [Normal(0,2),Normal(0,2)]","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Now we call the function log_likelihood_fun that returns a function to be minimized","category":"page"},{"location":"#","page":"Home","title":"Home","text":"ll = log_likelihood_fun(filter_from_parameters,priors,u,y)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Since this is a low-dimensional problem, we can plot the LL on a 2d-grid","category":"page"},{"location":"#","page":"Home","title":"Home","text":"function meshgrid(a,b)\n    grid_a = [i for i in a, j in b]\n    grid_b = [j for i in a, j in b]\n    grid_a, grid_b\nend\nNv       = 20\nv        = LinRange(-0.7,1,Nv)\nllxy     = (x,y) -> ll([x;y])\nVGx, VGy = meshgrid(v,v)\nVGz      = llxy.(VGx, VGy)\nheatmap(\n    VGz,\n    xticks = (1:Nv, round.(v, digits = 2)),\n    yticks = (1:Nv, round.(v, digits = 2)),\n    xlabel = \"sigma v\",\n    ylabel = \"sigma w\",\n) # Yes, labels are reversed","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Something seems to be off with this figure as the hottest spot is not really where we would expect it","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Optimization of the log likelihood can be done by, e.g., global/black box methods, see BlackBoxOptim.jl. Standard tricks apply, such as performing the parameter search in log-space etc.","category":"page"},{"location":"#Bayesian-inference-using-PMMH-1","page":"Home","title":"Bayesian inference using PMMH","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This is pretty cool. We procede like we did for MAP above, but when calling the function metropolis, we will get the entire posterior distribution of the parameter vector, for the small cost of a massive increase in computational cost.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"N = 1000\nfilter_from_parameters(θ, pf = nothing) = AuxiliaryParticleFilter(\n    N,\n    dynamics,\n    measurement,\n    MvNormal(n, exp(θ[1])),\n    MvNormal(p, exp(θ[2])),\n    d0,\n)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The call to exp on the parameters is so that we can define log-normal priors","category":"page"},{"location":"#","page":"Home","title":"Home","text":"priors = [Normal(0,2),Normal(0,2)]\nll     = log_likelihood_fun(filter_from_parameters,priors,u,y)\nθ₀     = log.([1.,1.]) # Starting point","category":"page"},{"location":"#","page":"Home","title":"Home","text":"We also need to define a function that suggests a new point from the \"proposal distribution\". This can be pretty much anything, but it has to be symmetric since I was lazy and simplified an equation.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"draw   = θ -> θ .+ rand(MvNormal(0.05ones(2)))\nburnin = 200\n@info \"Starting Metropolis algorithm\"\n@time theta, lls = metropolis(ll, 1200, θ₀, draw) # Run PMMH for 1200  iterations, takes about half a minute on my laptop\nthetam = reduce(hcat, theta)'[burnin+1:end,:] # Build a matrix of the output (was vecofvec)\nhistogram(exp.(thetam), layout=(3,1)); plot!(lls[burnin+1:end], subplot=3) # Visualize","category":"page"},{"location":"#","page":"Home","title":"Home","text":"If you are lucky, you can run the above threaded as well. I tried my best to make particle fitlers thread safe with their own rngs etc., but your milage may vary.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"@time thetalls = LowLevelParticleFilters.metropolis_threaded(burnin, ll, 500, θ₀, draw)\nhistogram(exp.(thetalls[:,1:2]), layout=3)\nplot!(thetalls[:,3], subplot=3)","category":"page"},{"location":"#AdvancedParticleFilter-1","page":"Home","title":"AdvancedParticleFilter","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The AdvancedParticleFilter type requires you to implement the same functions as the regular ParticleFilter, but in this case you also need to handle sampling from the noise distributions yourself. The function dynamics must have a method signature like below. It must provide one method that accepts state vector, control vector, time and noise::Bool that indicates whether or not to add noise to the state. If noise should be added, this should be done inside dynamics An example is given below","category":"page"},{"location":"#","page":"Home","title":"Home","text":"using Random\nconst rng = Random.MersenneTwister()\nfunction dynamics(x,u,t,noise=false) # It's important that this defaults to false\n    x = A*x .+ B*u # A simple dynamics model\n    if noise\n        x += rand(rng, df) # it's faster to supply your own rng\n    end\n    x\nend","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The measurement_likelihood function must have a method accepting state, measurement and time, and returning the log-likelihood of the measurement given the state, a simple example below:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"function measurement_likelihood(x,u,y,t)\n    logpdf(dg, C*x-y) # A simple linear measurement model with normal additive noise\nend","category":"page"},{"location":"#","page":"Home","title":"Home","text":"This gives you very high flexibility. The noise model in either function can, for instance, be a function of the state, something that is not possible for the simple ParticleFilter To be able to simulate the AdvancedParticleFilter like we did with the simple filter above, the measurement method with the signature measurement(x,u,t,noise=false) must be available and return a sample measurement given state (and possibly time). For our example measurement model above, this would look like this","category":"page"},{"location":"#","page":"Home","title":"Home","text":"measurement(x,u,t,noise=false) = C*x + noise*rand(rng, dg)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"We now create the AdvancedParticleFilter and use it in the same way as the other filters:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"apf = AdvancedParticleFilter(N, dynamics, measurement, measurement_likelihood, df, d0)\nx,w,we,ll = forward_trajectory(apf, u, y)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"trajectorydensity(apf, x, we, u, y, xreal=xs)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"We can even use this type as an AuxiliaryParticleFilter","category":"page"},{"location":"#","page":"Home","title":"Home","text":"apfa = AuxiliaryParticleFilter(apf)\nx,w,we,ll = forward_trajectory(apfa, u, y)\ntrajectorydensity(apfa, x, we, u, y, xreal=xs)\ndimensiondensity(apfa, x, we, u, y, 1, xreal=xs) # Same as above, but only plots a single dimension","category":"page"}]
}