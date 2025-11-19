import React from 'react';
import { Head } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import AuthContainer from '@/Components/Auth/AuthContainer';

export default function Login({ status, errors }) {
    return (
        <AuthLayout>
            <Head title="Authentication" />
            <AuthContainer 
                loginStatus={status} 
                loginErrors={errors || {}} 
            />
        </AuthLayout>
    );
}