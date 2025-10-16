<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ClerkWebhookController extends Controller
{
    /**
     * Handle Clerk webhook events
     */
    public function handle(Request $request)
    {
        $event = $request->input('type');
        $data = $request->input('data');

        Log::info('Clerk Webhook Received', ['event' => $event, 'data' => $data]);

        try {
            switch ($event) {
                case 'user.created':
                    $this->handleUserCreated($data);
                    break;

                case 'user.updated':
                    $this->handleUserUpdated($data);
                    break;

                case 'user.deleted':
                    $this->handleUserDeleted($data);
                    break;

                default:
                    Log::info('Unhandled Clerk event', ['event' => $event]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Clerk Webhook Error', [
                'error' => $e->getMessage(),
                'event' => $event
            ]);

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Handle user.created event
     */
    private function handleUserCreated($data)
    {
        $email = $data['email_addresses'][0]['email_address'] ?? null;
        $firstName = $data['first_name'] ?? '';
        $lastName = $data['last_name'] ?? '';

        if (!$email) {
            Log::warning('No email address in Clerk user data', ['data' => $data]);
            return;
        }

        User::updateOrCreate(
            ['clerk_id' => $data['id']],
            [
                'name' => trim($firstName . ' ' . $lastName) ?: 'User',
                'email' => $email,
                'email_verified_at' => now(),
                'password' => null, // Clerk handles authentication
            ]
        );

        Log::info('User created/updated from Clerk', [
            'clerk_id' => $data['id'],
            'email' => $email
        ]);
    }

    /**
     * Handle user.updated event
     */
    private function handleUserUpdated($data)
    {
        $user = User::where('clerk_id', $data['id'])->first();

        if (!$user) {
            // If user doesn't exist, create them
            $this->handleUserCreated($data);
            return;
        }

        $email = $data['email_addresses'][0]['email_address'] ?? $user->email;
        $firstName = $data['first_name'] ?? '';
        $lastName = $data['last_name'] ?? '';

        $user->update([
            'name' => trim($firstName . ' ' . $lastName) ?: $user->name,
            'email' => $email,
        ]);

        Log::info('User updated from Clerk', [
            'clerk_id' => $data['id'],
            'email' => $email
        ]);
    }

    /**
     * Handle user.deleted event
     */
    private function handleUserDeleted($data)
    {
        $user = User::where('clerk_id', $data['id'])->first();

        if ($user) {
            // Optionally soft delete or hard delete
            $user->delete();

            Log::info('User deleted from Clerk', [
                'clerk_id' => $data['id']
            ]);
        }
    }
}
