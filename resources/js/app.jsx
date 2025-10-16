// resources/js/app.jsx
import './bootstrap';
import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ClerkProvider } from '@clerk/clerk-react';
import ClerkSessionSync from './Components/ClerkSessionSync';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    console.warn('Missing Clerk Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file.');
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ClerkProvider 
                publishableKey={PUBLISHABLE_KEY}
            >
                <ClerkSessionSync />
                <App {...props} />
            </ClerkProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
