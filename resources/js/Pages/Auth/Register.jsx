import { Head, Link } from '@inertiajs/react';
import { SignUp, useClerk } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';

export default function Register() {
    const { loaded } = useClerk();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (loaded) {
            // Small delay to ensure smooth transition
            setTimeout(() => setIsLoading(false), 300);
        }
    }, [loaded]);

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen flex">
                {/* Left side - Registration Form */}
                <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
                            <p className="text-gray-600">Start your learning journey today</p>
                        </div>

                        {/* Loading Animation */}
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-green-200 rounded-full"></div>
                                    <div className="w-16 h-16 border-4 border-green-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
                                </div>
                                <p className="mt-4 text-gray-600 text-sm animate-pulse">Loading registration...</p>
                            </div>
                        )}

                        {/* Clerk Sign Up Component with Email/Password + Social Login */}
                        <div className={`clerk-signup-wrapper transition-opacity duration-300 ${isLoading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                            <SignUp 
                                routing="hash"
                                signInUrl="/login"
                                afterSignUpUrl="/dashboard"
                                appearance={{
                                    elements: {
                                        rootBox: 'w-full',
                                        card: 'shadow-none bg-transparent',
                                        headerTitle: 'hidden',
                                        headerSubtitle: 'hidden',
                                        socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50 text-sm font-medium',
                                        socialButtonsBlockButtonText: 'font-medium',
                                        formButtonPrimary: 'bg-green-600 hover:bg-green-700 text-white font-semibold',
                                        formFieldInput: 'border-gray-300 focus:ring-green-500 focus:border-green-500',
                                        footerActionLink: 'text-blue-600 hover:text-blue-800',
                                        dividerLine: 'bg-gray-300',
                                        dividerText: 'text-gray-500 text-sm',
                                    },
                                    layout: {
                                        socialButtonsPlacement: 'top',
                                        socialButtonsVariant: 'blockButton',
                                    }
                                }}
                            />
                        </div>

                        <p className={`text-center text-sm text-gray-600 mt-6 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right side - Image */}
                <div className="hidden lg:block relative flex-1">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://lms.codevocado.in/static/media/header.b6b686e72d983bb6c9dc.webp"
                        alt="Learning platform illustration"
                    />
                </div>
            </div>
        </>
    );
}
