import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../utils/api';
import { validateEmail } from '../../utils/helpers';
import { LogIn, Mail, Lock, TrendingUp } from 'lucide-react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!password) {
            setError('Please enter your password');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.login({ email, password });
            
            if (response.data.success) {
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data));
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-md w-full space-y-8 animate-slide-in">
                    {/* Logo and Title */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-3 rounded-2xl">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to continue managing your finances
                        </p>
                    </div>

                    {/* Form */}
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-11"
                                    placeholder="bhavish@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-11"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Sign In
                                </>
                            )}
                        </button>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-700">
                                Create one now
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right Side - Feature Showcase */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 items-center justify-center p-12">
                <div className="max-w-md text-white space-y-8 animate-fade-in">
                    <h1 className="text-4xl font-bold">Track Every Rupees</h1>
                    <p className="text-lg text-primary-100">
                        Take control of your finances with powerful insights, beautiful charts, and intelligent tracking.
                    </p>
                    <div className="space-y-4">
                        <Feature title="Smart Analytics" description="Visualize your spending patterns with interactive charts" />
                        <Feature title="Category Tracking" description="Organize expenses and income by custom categories" />
                        <Feature title="Monthly Reports" description="Get detailed insights into your financial health" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Feature({ title, description }) {
    return (
        <div className="flex gap-4 items-start">
            <div className="bg-white/20 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6" />
            </div>
            <div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-primary-100 text-sm">{description}</p>
            </div>
        </div>
    );
}

export default Login;
