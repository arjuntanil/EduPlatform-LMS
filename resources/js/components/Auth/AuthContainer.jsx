import React, { useState } from 'react';
import LoginForm from '@/Components/Auth/LoginForm';
import RegisterForm from '@/Components/Auth/RegisterForm';

export default function AuthContainer({ loginErrors = {}, registerErrors = {}, loginStatus = null }) {
    const [isLogin, setIsLogin] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleTransition = (toLogin) => {
        if (isLogin === toLogin) return;
        
        setIsTransitioning(true);
        setTimeout(() => {
            setIsLogin(toLogin);
            setIsTransitioning(false);
        }, 300);
    };

    const handleSuccess = () => {
        // Redirect will be handled by Inertia
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Welcome to <span className="text-blue-600">EduPlatform</span>
                    </h1>
                    <p className="mt-3 text-gray-600">
                        {isLogin 
                            ? 'Sign in to access your learning dashboard' 
                            : 'Create an account to start your learning journey'}
                    </p>
                </div>

                <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    <div className="md:flex">
                        {/* Left Panel - Illustration */}
                        <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 md:p-12 hidden md:flex flex-col justify-center">
                            <div className="text-white text-center">
                                <div className="mb-6">
                                    <svg className="w-24 h-24 mx-auto text-white/90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Continue Learning</h2>
                                <p className="text-blue-100">
                                    Access thousands of courses and advance your career with our comprehensive learning platform.
                                </p>
                            </div>
                        </div>

                        {/* Right Panel - Forms */}
                        <div className="md:w-1/2 w-full p-6 sm:p-8">
                            {/* Toggle Buttons */}
                            <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
                                <button
                                    onClick={() => handleTransition(true)}
                                    className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                                        isLogin 
                                            ? 'bg-white shadow-sm text-blue-600' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => handleTransition(false)}
                                    className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                                        !isLogin 
                                            ? 'bg-white shadow-sm text-blue-600' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Sign Up
                                </button>
                            </div>

                            {/* Status Message */}
                            {loginStatus && (
                                <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-800 text-sm">
                                    {loginStatus}
                                </div>
                            )}

                            {/* Form Container with Transition */}
                            <div className="relative overflow-hidden h-[400px]">
                                <div 
                                    className={`transition-transform duration-300 ease-in-out w-full absolute top-0 left-0 ${
                                        isTransitioning ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    style={{ 
                                        transform: `translateX(${isLogin ? '0' : '-100%'})`,
                                    }}
                                >
                                    <LoginForm 
                                        onSuccess={handleSuccess} 
                                        errors={loginErrors} 
                                    />
                                </div>
                                
                                <div 
                                    className={`transition-transform duration-300 ease-in-out w-full absolute top-0 left-0 ${
                                        isTransitioning ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    style={{ 
                                        transform: `translateX(${!isLogin ? '0' : '100%'})`,
                                    }}
                                >
                                    <RegisterForm 
                                        onSuccess={handleSuccess} 
                                        errors={registerErrors} 
                                    />
                                </div>
                            </div>

                            {/* Social Login Options */}
                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-300">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                        </svg>
                                    </button>
                                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-300">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="text-center text-sm text-gray-500">
                    <p>© 2024 EduPlatform. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}