<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SyncClerkUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if Clerk user ID is in session
        $clerkUserId = $request->session()->get('clerk_user_id');
        $clerkUserEmail = $request->session()->get('clerk_user_email');
        $clerkUserName = $request->session()->get('clerk_user_name');

        if ($clerkUserId) {
            // Find or create user in Laravel database
            $user = User::firstOrCreate(
                ['clerk_id' => $clerkUserId],
                [
                    'name' => $clerkUserName ?? 'User',
                    'email' => $clerkUserEmail ?? '',
                    'email_verified_at' => now(),
                    'password' => null,
                ]
            );

            // Update user info if changed
            if ($clerkUserName && $user->name !== $clerkUserName) {
                $user->name = $clerkUserName;
            }
            if ($clerkUserEmail && $user->email !== $clerkUserEmail) {
                $user->email = $clerkUserEmail;
            }
            if ($user->isDirty()) {
                $user->save();
            }

            // Log in the user for Laravel's session
            if (!Auth::check() || Auth::id() !== $user->id) {
                Auth::login($user);
            }

            // Attach user to request for easy access
            $request->merge(['clerk_user' => $user]);
        }

        return $next($request);
    }
}
