import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            birthday: user.birthday || '',
        });

    const [preview, setPreview] = useState(null);

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profile_photo', file);
            
            // Submit the photo immediately using POST method
            post(route('profile.photo.update'), {
                data: formData,
                forceFormData: true,
                onSuccess: () => {
                    // Refresh the page to show the new photo
                    window.location.reload();
                }
            });
        }
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Update your account's profile information and email address.
                    </p>
                </div>

                {/* Profile Photo */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-gray-50 rounded-lg">
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Photo
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
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
                        </div>
                        <p className="mt-1 text-xs text-gray-500">JPG, PNG, GIF up to 2MB</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <InputLabel htmlFor="phone" value="Phone Number" />

                        <TextInput
                            id="phone"
                            type="tel"
                            className="mt-1 block w-full"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            autoComplete="tel"
                        />

                        <InputError className="mt-2" message={errors.phone} />
                    </div>

                    {/* Birthday */}
                    <div>
                        <InputLabel htmlFor="birthday" value="Birthday" />

                        <TextInput
                            id="birthday"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.birthday}
                            onChange={(e) => setData('birthday', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.birthday} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm text-yellow-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-1 rounded-md text-sm text-yellow-700 underline hover:text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}