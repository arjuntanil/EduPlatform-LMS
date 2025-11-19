import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function CompleteProfile({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        profile_photo: null,
        birthday: user.birthday || '',
        phone: user.phone || '',
    });

    const [preview, setPreview] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        if (data.profile_photo) {
            formData.append('profile_photo', data.profile_photo);
        }
        formData.append('birthday', data.birthday);
        formData.append('phone', data.phone);
        
        post(route('profile.complete.store'), {
            data: formData,
            forceFormData: true,
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('profile_photo', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Complete Profile" />

            <div className="py-8">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-6 py-8 sm:px-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Complete Your Profile
                                </h2>
                                <p className="mt-2 text-gray-600">
                                    Please complete your profile information to continue using the platform.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Profile Photo */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <label className="block text-lg font-medium text-gray-900 mb-4">
                                        Profile Photo
                                    </label>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                        <div className="shrink-0">
                                            {preview ? (
                                                <img 
                                                    className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105" 
                                                    src={preview} 
                                                    alt="Preview" 
                                                />
                                            ) : user.profile_photo_path ? (
                                                <img 
                                                    className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105" 
                                                    src={`/storage/${user.profile_photo_path}`} 
                                                    alt="Profile" 
                                                />
                                            ) : (
                                                <div className="bg-gray-200 border-2 border-dashed rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <label className="block">
                                                <span className="sr-only">Choose profile photo</span>
                                                <input 
                                                    type="file" 
                                                    className="block w-full text-sm text-gray-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-lg file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-blue-600 file:text-white
                                                        hover:file:bg-blue-700
                                                        file:transition-colors file:duration-200
                                                        cursor-pointer
                                                    "
                                                    onChange={handlePhotoChange}
                                                    accept="image/*"
                                                />
                                            </label>
                                            <p className="mt-2 text-xs text-gray-500">JPG, PNG, GIF up to 2MB</p>
                                        </div>
                                    </div>
                                    {errors.profile_photo && <div className="mt-2 text-sm text-red-600">{errors.profile_photo}</div>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Phone Number */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400`}
                                                required
                                            />
                                        </div>
                                        {errors.phone && <div className="mt-1 text-sm text-red-600">{errors.phone}</div>}
                                    </div>

                                    {/* Birthday */}
                                    <div>
                                        <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-1">
                                            Birthday
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <input
                                                type="date"
                                                name="birthday"
                                                id="birthday"
                                                value={data.birthday}
                                                onChange={(e) => setData('birthday', e.target.value)}
                                                className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border ${errors.birthday ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400`}
                                                required
                                            />
                                        </div>
                                        {errors.birthday && <div className="mt-1 text-sm text-red-600">{errors.birthday}</div>}
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 border border-transparent rounded-lg font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150 disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : 'Save and Continue'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}