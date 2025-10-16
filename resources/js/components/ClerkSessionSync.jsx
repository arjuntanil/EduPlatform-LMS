import { useUser, useAuth } from '@clerk/clerk-react';
import { useEffect, useRef } from 'react';
import axios from 'axios';

/**
 * ClerkSessionSync - Automatically syncs Clerk user with Laravel session
 * Add this component to your app.jsx to enable automatic user sync
 */
export default function ClerkSessionSync() {
    const { user, isSignedIn, isLoaded } = useUser();
    const { getToken } = useAuth();
    const syncStatus = useRef({ synced: false, syncing: false });

    useEffect(() => {
        const syncSession = async () => {
            if (!isLoaded) return;

            if (isSignedIn && user && !syncStatus.current.synced && !syncStatus.current.syncing) {
                try {
                    syncStatus.current.syncing = true;
                    console.log('🔄 Syncing Clerk user with Laravel...');
                    
                    // Get Clerk session token
                    const token = await getToken();

                    // Sync with Laravel backend
                    const response = await axios.post('/clerk/sync-session', {
                        clerk_user_id: user.id,
                        email: user.primaryEmailAddress?.emailAddress,
                        name: user.fullName || user.firstName || user.username || 'User',
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    syncStatus.current.synced = true;
                    syncStatus.current.syncing = false;
                    console.log('✅ Clerk user synced with Laravel session', response.data);
                } catch (error) {
                    console.error('❌ Failed to sync Clerk session:', error);
                    syncStatus.current.syncing = false;
                    // Reset after a delay to allow retry
                    setTimeout(() => {
                        syncStatus.current.synced = false;
                    }, 2000);
                }
            } else if (!isSignedIn && syncStatus.current.synced) {
                // User signed out - clear Laravel session
                syncStatus.current.synced = false;
                syncStatus.current.syncing = false;
                try {
                    await axios.post('/clerk/clear-session');
                    console.log('✅ Clerk session cleared');
                } catch (error) {
                    console.error('❌ Failed to clear Clerk session:', error);
                }
            }
        };

        syncSession();
    }, [isSignedIn, user, isLoaded, getToken]);

    return null; // This component doesn't render anything
}
