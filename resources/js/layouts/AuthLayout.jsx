import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthLayout({ children }) {
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

    const navigationItems = [
        { label: 'Home', href: '/' },
        { label: 'Courses', href: '/#courses' },
        { label: 'Mentor', href: '/#mentor' },
        { label: 'Group', href: '/#portfolio' },
        { label: 'Testimonial', href: '/#testimonial' },
        { label: 'Docs', href: '/documentation' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
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
                                    className={`font-medium ${item.href === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex items-center gap-4">
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
                                        className={`py-2 px-4 w-full text-left ${item.href === '/' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                                        onClick={() => setNavbarOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            <main className="pt-24">
                {children}
            </main>
        </div>
    );
}