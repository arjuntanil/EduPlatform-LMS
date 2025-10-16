import React from 'react';
import { Head } from '@inertiajs/react';
import ClerkAuthLayout from '@/Layouts/ClerkAuthLayout';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';

export default function ClerkDemo() {
    const { user, isLoaded } = useUser();

    return (
        <ClerkAuthLayout>
            <Head title="Clerk Authentication Demo" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        Clerk Authentication Demo
                    </h1>

                    {/* Content visible to signed-out users */}
                    <SignedOut>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-blue-900 mb-3">
                                Welcome! Please sign in or sign up
                            </h2>
                            <p className="text-blue-700">
                                You are currently viewing this page as a guest. Sign in to access personalized features and your learning dashboard.
                            </p>
                        </div>
                    </SignedOut>

                    {/* Content visible to signed-in users */}
                    <SignedIn>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-green-900 mb-3">
                                Welcome back! You're signed in
                            </h2>
                            
                            {isLoaded && user && (
                                <div className="mt-4 space-y-2">
                                    <p className="text-green-700">
                                        <strong>User ID:</strong> {user.id}
                                    </p>
                                    <p className="text-green-700">
                                        <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
                                    </p>
                                    <p className="text-green-700">
                                        <strong>Name:</strong> {user.firstName} {user.lastName}
                                    </p>
                                    <p className="text-green-700">
                                        <strong>Username:</strong> {user.username || 'Not set'}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Example of protected content */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Your Enrolled Courses
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-semibold text-gray-900">Python Basics</h4>
                                    <p className="text-sm text-gray-600 mt-1">Progress: 75%</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-semibold text-gray-900">React Advanced</h4>
                                    <p className="text-sm text-gray-600 mt-1">Progress: 40%</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                                    </div>
                                </div>
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-semibold text-gray-900">SQL Mastery</h4>
                                    <p className="text-sm text-gray-600 mt-1">Progress: 10%</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SignedIn>

                    {/* General information section */}
                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Features of Clerk Authentication
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Secure user authentication with multiple sign-in methods</li>
                            <li>Built-in user management and profile handling</li>
                            <li>Social login options (Google, GitHub, etc.)</li>
                            <li>Multi-factor authentication support</li>
                            <li>Session management and security</li>
                            <li>Beautiful, customizable UI components</li>
                        </ul>
                    </div>
                </div>
            </div>
        </ClerkAuthLayout>
    );
}
