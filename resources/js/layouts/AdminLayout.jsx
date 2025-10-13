import { useState } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { 
    HomeIcon, 
    BookOpenIcon, 
    CalendarIcon, 
    TagIcon, 
    UsersIcon,
    Bars3Icon,
    XMarkIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage().props;
    const { post } = useForm();

    const handleLogout = () => {
        post(route('logout'));
    };

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
        { name: 'Courses', href: '/admin/courses', icon: BookOpenIcon },
        { name: 'Events', href: '/admin/events', icon: CalendarIcon },
        { name: 'Categories', href: '/admin/categories', icon: TagIcon },
        { name: 'Users', href: '/admin/users', icon: UsersIcon },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Admin Dashboard" />
            
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <XMarkIcon className="h-6 w-6 text-white" />
                        </button>
                    </div>
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    <item.icon className="mr-4 h-6 w-6" />
                                    {item.name}
                                </Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600 w-full"
                            >
                                <ArrowRightOnRectangleIcon className="mr-4 h-6 w-6" />
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    <item.icon className="mr-3 h-6 w-6" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        <div className="flex-shrink-0 w-full group block">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                        {auth.user.name}
                                    </div>
                                    <div className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                                        Administrator
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                >
                                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

