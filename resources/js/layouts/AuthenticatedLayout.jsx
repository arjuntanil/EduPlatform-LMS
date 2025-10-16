import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Footer from '@/Components/Footer';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import { UserButton, useUser, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';


export default function AuthenticatedLayout({ header, children }) {
    // Support both Laravel auth and Clerk auth
    const pageProps = usePage().props;
    const laravelUser = pageProps.auth?.user;
    const { user: clerkUser, isLoaded } = useUser();
    
    // Use Clerk user if available, otherwise fall back to Laravel user
    const user = clerkUser ? {
        name: clerkUser.fullName || clerkUser.firstName || clerkUser.username || 'User',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
    } : laravelUser;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const coursesHref = route().current('dashboard') ? '#courses' : `${route('dashboard')}#courses`;

    return (
        <div className="min-h-screen bg-gray-100 scroll-smooth">
            <nav className="border-b border-gray-100 bg-blue-600 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <span className="text-xl font-bold text-white">EduPlatform</span>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-white hover:text-white/90"
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    href={coursesHref}
                                    active={route().current('courses')}
                                    className="text-white hover:text-white/90"
                                >
                                    Courses
                                </NavLink>
                                <NavLink
                                    href={route('faculty')}
                                    active={route().current('faculty')}
                                    className="text-white hover:text-white/90"
                                >
                                    Faculty
                                </NavLink>
                                <NavLink
                                    href={route('events')}
                                    active={route().current('events')}
                                    className="text-white hover:text-white/90"
                                >
                                    Events
                                </NavLink>
                                <NavLink
                                    href={route('my-learning')}
                                    active={route().current('my-learning')}
                                    className="text-white hover:text-white/90"
                                >
                                    My Learning
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center gap-4">
                            {/* Clerk Authentication UI */}
                            <SignedIn>
                                {/* Show Clerk UserButton when signed in with Clerk */}
                                <div className="flex items-center gap-3">
                                    {clerkUser && (
                                        <span className="text-white text-sm font-medium">
                                            {clerkUser.firstName || clerkUser.username}
                                        </span>
                                    )}
                                    <UserButton 
                                        afterSignOutUrl="/login"
                                        appearance={{
                                            elements: {
                                                avatarBox: 'w-9 h-9',
                                                userButtonPopoverCard: 'shadow-lg',
                                                userButtonPopoverActionButton: 'hover:bg-gray-100',
                                            }
                                        }}
                                    />
                                </div>
                            </SignedIn>
                            
                            <SignedOut>
                                {/* Show Sign In button when not signed in */}
                                <Link 
                                    href={route('login')}
                                    className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
                                >
                                    Sign In
                                </Link>
                            </SignedOut>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
            <Footer />
        </div>
    );
}
