import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

/**
 * ProtectedPage - Wrapper component to protect pages with Clerk authentication
 * 
 * Usage:
 * import ProtectedPage from '@/Components/ProtectedPage';
 * 
 * export default function MyPage() {
 *     return (
 *         <ProtectedPage>
 *             <YourProtectedContent />
 *         </ProtectedPage>
 *     );
 * }
 */
export default function ProtectedPage({ 
    children, 
    redirectUrl = '/login',
    fallback = null 
}) {
    return (
        <>
            <SignedIn>
                {children}
            </SignedIn>
            
            <SignedOut>
                {fallback || <RedirectToSignIn redirectUrl={redirectUrl} />}
            </SignedOut>
        </>
    );
}
