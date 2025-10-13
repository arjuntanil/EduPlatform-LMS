import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { UsersIcon } from '@heroicons/react/24/outline';

export default function AdminUsers({ users }) {
    return (
        <AdminLayout>
            <Head title="Manage Users" />
            
            <div className="space-y-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
                        <p className="mt-2 text-sm text-gray-700">View all registered users in your LMS.</p>
                    </div>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <li key={user.id}>
                                <div className="px-4 py-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                <UsersIcon className="h-6 w-6 text-green-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.email}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.enrollments_count} enrollments
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {users.length === 0 && (
                    <div className="text-center py-12">
                        <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No users</h3>
                        <p className="mt-1 text-sm text-gray-500">No users have registered yet.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}


