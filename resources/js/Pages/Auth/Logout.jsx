import { useEffect } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { Head } from '@inertiajs/react';

export default function Logout() {
    const { signOut } = useClerk();

    useEffect(() => {
        const handleSignOut = async () => {
            await signOut();
            window.location.href = '/login';
        };
        
        handleSignOut();
    }, [signOut]);

    return (
        <>
            <Head title="Logging out..." />
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Logging out...</p>
                </div>
            </div>
        </>
    );
}
