import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { 
    BookOpenIcon, 
    UsersIcon, 
    CalendarIcon, 
    AcademicCapIcon 
} from '@heroicons/react/24/outline';

export default function AdminDashboard({ stats, recent_courses, recent_users, recent_events }) {
    const statCards = [
        {
            name: 'Total Courses',
            value: stats.total_courses,
            icon: BookOpenIcon,
            color: 'bg-blue-500',
        },
        {
            name: 'Total Users',
            value: stats.total_users,
            icon: UsersIcon,
            color: 'bg-green-500',
        },
        {
            name: 'Total Events',
            value: stats.total_events,
            icon: CalendarIcon,
            color: 'bg-purple-500',
        },
        {
            name: 'Total Enrollments',
            value: stats.total_enrollments,
            icon: AcademicCapIcon,
            color: 'bg-orange-500',
        },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Welcome to the admin panel. Manage your LMS from here.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card) => (
                        <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className={`p-3 rounded-md ${card.color}`}>
                                            <card.icon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                {card.name}
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {card.value}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Recent Courses */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                Recent Courses
                            </h3>
                            <div className="space-y-3">
                                {recent_courses.map((course) => (
                                    <div key={course.id} className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <BookOpenIcon className="h-4 w-4 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {course.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {course.category?.name || 'No Category'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Users */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                Recent Users
                            </h3>
                            <div className="space-y-3">
                                {recent_users.map((user) => (
                                    <div key={user.id} className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <UsersIcon className="h-4 w-4 text-green-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Events */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                Recent Events
                            </h3>
                            <div className="space-y-3">
                                {recent_events.map((event) => (
                                    <div key={event.id} className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <CalendarIcon className="h-4 w-4 text-purple-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {event.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(event.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
