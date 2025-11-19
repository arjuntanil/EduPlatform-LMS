import { useEffect, useState } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function ForceLogout() {
    const { signOut } = useClerk();
    const [status, setStatus] = useState('Clearing session...');

    useEffect(() => {
        const clearEverything = async () => {
            try {
                setStatus('Clearing Laravel session...');
                // Clear Laravel session first
                await axios.post('/clerk/clear-session').catch(() => {});
                
                setStatus('Signing out from Clerk...');
                // Sign out from Clerk
                await signOut();
                
                setStatus('Clearing browser cache...');
                // Clear local storage
                localStorage.clear();
                sessionStorage.clear();
                
                // Wait a moment
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                setStatus('Redirecting to login...');
                // Redirect to login
                window.location.href = '/login';
            } catch (error) {
                console.error('Error during force logout:', error);
                setStatus('Error occurred. Redirecting anyway...');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            }
        };
        
        clearEverything();
    }, [signOut]);

    return (
        <>
            <Head title="Logging out..." />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                    <div className="mb-6">
                        <div className="mx-auto w-16 h-16 relative">
                            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Logging Out</h2>
                    <p className="text-gray-600 animate-pulse">{status}</p>
                    <p className="text-xs text-gray-500 mt-4">This will clear all sessions and cache</p>
                </div>
            </div>
        </>
    );
}
