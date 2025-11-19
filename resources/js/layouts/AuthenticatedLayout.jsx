import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { route } from 'ziggy-js';
import Footer from '@/Components/Footer';

export default function AuthenticatedLayout({ header, children }) {
    // Use Laravel auth user
    const pageProps = usePage().props;
    const user = pageProps.auth?.user;

    const [navbarOpen, setNavbarOpen] = useState(false);
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY >= 80);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (navbarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [navbarOpen]);

    const navigationItems = [
        { label: 'Home', href: '/' },
        { label: 'Courses', href: '/#courses' },
        { label: 'Mentor', href: '/#mentor' },
        { label: 'Group', href: '/#portfolio' },
        { label: 'Testimonial', href: '/#testimonial' },
        { label: 'Docs', href: '/documentation' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <header
                className={`fixed top-0 z-40 w-full pb-5 transition-all duration-300 bg-white ${sticky ? " shadow-lg py-5" : "shadow-none py-6"
                    }`}
            >
                <div className="lg:py-0 py-2">
                    <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md flex items-center justify-between px-4">
                        <div className="text-xl font-bold text-gray-800">
                            <Link href="/">EduPlatform</Link>
                        </div>
                        <nav className="hidden lg:flex flex-grow items-center gap-8 justify-center">
                            {navigationItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`font-medium ${route().current(item.href) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex items-center gap-4">
                            {user ? (
                                <div className="hidden lg:flex items-center gap-3">
                                    <div className="relative group">
                                        {user.profile_photo_path ? (
                                            <img 
                                                src={`/storage/${user.profile_photo_path}`} 
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-sm">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-sm font-medium text-gray-900">
                                            {user.name || 'User'}
                                        </span>
                                        <Link
                                            href={route('profile.edit')}
                                            className="text-xs text-gray-500 hover:text-gray-700"
                                        >
                                            View profile
                                        </Link>
                                    </div>
                                    <Link
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                        className="ml-2 text-gray-700 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                        </svg>
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="hidden lg:block bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="hidden lg:block bg-blue-100 hover:bg-blue-200 text-blue-600 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                            <button
                                onClick={() => setNavbarOpen(!navbarOpen)}
                                className="block lg:hidden p-2 rounded-lg"
                                aria-label="Toggle mobile menu"
                            >
                                <span className="block w-6 h-0.5 bg-gray-700"></span>
                                <span className="block w-6 h-0.5 bg-gray-700 mt-1.5"></span>
                                <span className="block w-6 h-0.5 bg-gray-700 mt-1.5"></span>
                            </button>
                        </div>
                    </div>
                    {navbarOpen && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" />
                    )}
                    {navbarOpen && (
                        <div
                            className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 max-w-xs ${navbarOpen ? "translate-x-0" : "translate-x-full"
                                } z-50`}
                        >
                            <div className="flex items-center justify-between p-4">
                                <h2 className="text-lg font-bold text-gray-800">
                                    <Link href="/">EduPlatform</Link>
                                </h2>
                                <button
                                    onClick={() => setNavbarOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Close menu"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <nav className="flex flex-col items-start p-4">
                                {navigationItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={`py-2 px-4 w-full text-left ${route().current(item.href) ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                                        onClick={() => setNavbarOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <div className="mt-4 flex flex-col space-y-4 w-full">
                                    {user ? (
                                        <>
                                            <Link
                                                href={route('profile.edit')}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                                onClick={() => setNavbarOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                method="post"
                                                href={route('logout')}
                                                as="button"
                                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                                onClick={() => setNavbarOpen(false)}
                                            >
                                                Log Out
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="bg-transparent border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
                                                onClick={() => setNavbarOpen(false)}
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                                onClick={() => setNavbarOpen(false)}
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            <main className="pt-24">
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                </div>
            </main>
            
            <Footer />
        </div>
    );
}