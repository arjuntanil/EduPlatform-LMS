import { Head } from '@inertiajs/react';
import { useUser, useAuth, useClerk } from '@clerk/clerk-react';
import { useState } from 'react';
import axios from 'axios';

export default function DiagnosticPage() {
    const { user, isSignedIn, isLoaded } = useUser();
    const { getToken } = useAuth();
    const clerk = useClerk();
    const [syncResult, setSyncResult] = useState(null);
    const [testing, setTesting] = useState(false);

    const testSync = async () => {
        setTesting(true);
        try {
            const token = await getToken();
            const response = await axios.post('/clerk/sync-session', {
                clerk_user_id: user.id,
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName || user.firstName || user.username || 'User',
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSyncResult({ success: true, data: response.data });
        } catch (error) {
            setSyncResult({ success: false, error: error.response?.data || error.message });
        }
        setTesting(false);
    };

    return (
        <>
            <Head title="Clerk Diagnostic" />
            <div className="min-h-screen bg-gray-100 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">🔍 Clerk Diagnostic Page</h1>
                        
                        {/* Clerk Status */}
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h2 className="text-xl font-semibold mb-3 text-blue-900">Clerk Status</h2>
                            <div className="space-y-2 text-sm">
                                <p><strong>Loaded:</strong> <span className={isLoaded ? 'text-green-600' : 'text-red-600'}>{isLoaded ? '✅ Yes' : '❌ No'}</span></p>
                                <p><strong>Signed In:</strong> <span className={isSignedIn ? 'text-green-600' : 'text-red-600'}>{isSignedIn ? '✅ Yes' : '❌ No'}</span></p>
                                {user && (
                                    <>
                                        <p><strong>User ID:</strong> {user.id}</p>
                                        <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
                                        <p><strong>Name:</strong> {user.fullName || user.firstName || 'N/A'}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Session Test */}
                        {isSignedIn && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <h2 className="text-xl font-semibold mb-3 text-green-900">Session Sync Test</h2>
                                <button
                                    onClick={testSync}
                                    disabled={testing}
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                >
                                    {testing ? 'Testing...' : 'Test Session Sync'}
                                </button>

                                {syncResult && (
                                    <div className={`mt-4 p-3 rounded ${syncResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        <p className="font-semibold">{syncResult.success ? '✅ Success!' : '❌ Error'}</p>
                                        <pre className="mt-2 text-xs overflow-auto">
                                            {JSON.stringify(syncResult.success ? syncResult.data : syncResult.error, null, 2)}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <h2 className="text-xl font-semibold mb-3 text-gray-900">Quick Actions</h2>
                            <div className="space-x-3">
                                <button
                                    onClick={() => window.location.href = '/dashboard'}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Go to Dashboard
                                </button>
                                <button
                                    onClick={() => window.location.href = '/force-logout'}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Force Logout
                                </button>
                                <button
                                    onClick={() => window.location.href = '/fix-login.html'}
                                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                                >
                                    Clear Cache
                                </button>
                            </div>
                        </div>

                        {/* Browser Info */}
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <h2 className="text-xl font-semibold mb-3 text-yellow-900">Browser Info</h2>
                            <div className="text-sm space-y-1">
                                <p><strong>User Agent:</strong> {navigator.userAgent}</p>
                                <p><strong>Current URL:</strong> {window.location.href}</p>
                                <p><strong>Local Storage Items:</strong> {localStorage.length}</p>
                                <p><strong>Session Storage Items:</strong> {sessionStorage.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
