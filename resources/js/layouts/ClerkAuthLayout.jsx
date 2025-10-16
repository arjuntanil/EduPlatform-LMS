import React from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from '@inertiajs/react';

export default function ClerkAuthLayout({ children }) {
    const { user, isLoaded } = useUser();

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-xl font-bold text-gray-900">
                                    EduPlatform LMS
                                </Link>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href="/"
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                                >
                                    Home
                                </Link>
                                <SignedIn>
                                    <Link
                                        href="/my-learning"
                                        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        My Learning
                                    </Link>
                                    <Link
                                        href="/dashboard"
                                        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        Dashboard
                                    </Link>
                                </SignedIn>
                            </div>
                        </div>

                        {/* Right side - Auth buttons */}
                        <div className="flex items-center">
                            <SignedOut>
                                <div className="flex space-x-4">
                                    <SignInButton mode="modal">
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Sign In
                                        </button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Sign Up
                                        </button>
                                    </SignUpButton>
                                </div>
                            </SignedOut>
                            <SignedIn>
                                <div className="flex items-center space-x-4">
                                    {isLoaded && user && (
                                        <span className="text-sm text-gray-700">
                                            Hello, {user.firstName || user.username}
                                        </span>
                                    )}
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            </SignedIn>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        © 2025 EduPlatform LMS. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
