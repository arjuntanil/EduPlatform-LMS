<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ClerkAuthController extends Controller
{
    /**
     * Sync Clerk user session with Laravel
     * Handles account linking: if user exists with same email, link to that account
     */
    public function syncSession(Request $request)
    {
        $clerkUserId = $request->input('clerk_user_id');
        $email = $request->input('email');
        $name = $request->input('name');

        if (!$clerkUserId || !$email) {
            return response()->json(['error' => 'Missing required fields'], 400);
        }

        try {
            // First, check if a user with this email already exists (from manual signup or social)
            $existingUser = User::where('email', $email)->first();

            if ($existingUser) {
                // User exists with this email - link accounts
                if (!$existingUser->clerk_id) {
                    // User was created manually (no clerk_id yet) - link it
                    $existingUser->clerk_id = $clerkUserId;
                    $existingUser->email_verified_at = $existingUser->email_verified_at ?? now();
                    $existingUser->save();
                    
                    Log::info('Account linked: Manual user linked to Clerk', [
                        'user_id' => $existingUser->id,
                        'email' => $email,
                        'clerk_id' => $clerkUserId
                    ]);
                }
                
                $user = $existingUser;
            } else {
                // No existing user - create new one
                $user = User::create([
                    'clerk_id' => $clerkUserId,
                    'name' => $name ?? 'User',
                    'email' => $email,
                    'email_verified_at' => now(),
                    'password' => null,
                ]);
                
                Log::info('New Clerk user created', [
                    'user_id' => $user->id,
                    'clerk_id' => $clerkUserId,
                    'email' => $email
                ]);
            }

            // Log in user
            Auth::login($user);

            // Store in session for middleware
            $request->session()->put('clerk_user_id', $clerkUserId);
            $request->session()->put('clerk_user_email', $email);
            $request->session()->put('clerk_user_name', $name ?? $user->name);

            Log::info('Clerk user synced successfully', [
                'user_id' => $user->id,
                'clerk_id' => $clerkUserId,
                'email' => $email,
                'linked' => $existingUser ? 'yes' : 'no'
            ]);

            return response()->json([
                'success' => true,
                'user' => $user,
                'linked' => $existingUser ? true : false
            ]);
        } catch (\Exception $e) {
            Log::error('Clerk sync error', [
                'error' => $e->getMessage(),
                'clerk_id' => $clerkUserId,
                'email' => $email
            ]);

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Clear Clerk session
     */
    public function clearSession(Request $request)
    {
        $request->session()->forget(['clerk_user_id', 'clerk_user_email', 'clerk_user_name']);
        Auth::logout();

        return response()->json(['success' => true]);
    }
}
