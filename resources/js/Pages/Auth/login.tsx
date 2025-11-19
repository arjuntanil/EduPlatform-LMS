import { Head, Link } from '@inertiajs/react';
import { SignIn, useClerk, useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

export default function Login() {
    const { loaded } = useClerk();
    const { isSignedIn } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (loaded && isSignedIn) {
            console.log('✅ Already signed in, redirecting to dashboard...');
            window.location.href = '/dashboard';
            return;
        }

        if (loaded) {
            setTimeout(() => setIsLoading(false), 300);
        }
    }, [loaded, isSignedIn]);

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen flex">
                <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                            <p className="text-gray-600">Login to continue learning</p>
                        </div>

                        {isLoading && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-blue-200 rounded-full" />
                                    <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0" />
                                </div>
                                <p className="mt-4 text-gray-600 text-sm animate-pulse">Loading authentication...</p>
                            </div>
                        )}

                        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                            <SignIn
                                path="/login"
                                routing="path"
                                signUpUrl="/register"
                                signInFallbackRedirectUrl="/dashboard"
                                appearance={{
                                    elements: {
                                        rootBox: 'w-full',
                                        card: 'shadow-none bg-transparent',
                                        headerTitle: 'hidden',
                                        headerSubtitle: 'hidden',
                                        socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50 text-sm font-medium',
                                        socialButtonsBlockButtonText: 'font-medium',
                                        formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold',
                                        formFieldInput: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
                                        footerActionLink: 'text-blue-600 hover:text-blue-800',
                                        dividerLine: 'bg-gray-300',
                                        dividerText: 'text-gray-500 text-sm',
                                    },
                                    layout: {
                                        socialButtonsPlacement: 'top',
                                        socialButtonsVariant: 'blockButton',
                                    },
                                }}
                            />
                        </div>

                        <p className={`text-center text-sm text-gray-600 mt-6 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                            Don't have an account?{' '}
                            <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

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
