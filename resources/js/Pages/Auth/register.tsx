import { Head, Link } from '@inertiajs/react';
import { SignUp } from '@clerk/clerk-react';

export default function Register() {
    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen flex">
                <div className="hidden lg:block relative flex-1">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://lms.codevocado.in/static/media/header.b6b686e72d983bb6c9dc.webp"
                        alt="Learning platform illustration"
                    />
                </div>

                <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create your account</h1>
                            <p className="text-gray-600">Sign up in seconds to access every course</p>
                        </div>

                        <SignUp
                            path="/register"
                            routing="path"
                            signInUrl="/login"
                            fallbackRedirectUrl="/dashboard"
                            signUpFallbackRedirectUrl="/dashboard"
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

                        <p className="text-center text-sm text-gray-600 mt-6">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
