import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="p-6 sm:p-8">
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Manage your profile information, password, and account settings.
                                </p>
                            </div>
                            
                            <div className="space-y-10">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                />
                                
                                <div className="border-t border-gray-200 pt-8">
                                    <UpdatePasswordForm />
                                </div>
                                
                                <div className="border-t border-gray-200 pt-8">
                                    <DeleteUserForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}