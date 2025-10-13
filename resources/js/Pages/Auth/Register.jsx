// resources/js/Pages/Auth/Register.jsx
import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <>
            <Head title="Register" />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded shadow">
                    <h2 className="text-2xl font-bold mb-6">Register</h2>

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label>Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label>Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label>Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                        </div>

                        <div className="mb-4">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {errors.password_confirmation && (
                                <p className="text-red-600 text-sm">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
