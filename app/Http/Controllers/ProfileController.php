<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update the user's profile photo.
     */
    public function updatePhoto(Request $request): RedirectResponse
    {
        $request->validate([
            'profile_photo' => 'required|image|max:2048',
        ]);

        $user = $request->user();

        // Handle profile photo upload
        if ($request->hasFile('profile_photo')) {
            $path = $request->file('profile_photo')->store('profile-photos', 'public');
            $user->profile_photo_path = $path;
            $user->save();
        }

        // Refresh the session data to ensure the new photo is shown in the header
        Auth::login($user, true);

        return Redirect::back();
    }

    /**
     * Display the profile completion form.
     */
    public function complete(Request $request): Response
    {
        // If user already completed profile, redirect to dashboard
        if ($request->user()->profile_photo_path && $request->user()->phone && $request->user()->birthday) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Profile/Complete', [
            'user' => $request->user(),
        ]);
    }

    /**
     * Store the completed profile information.
     */
    public function storeComplete(Request $request): RedirectResponse
    {
        $request->validate([
            'profile_photo' => 'nullable|image|max:2048',
            'birthday' => 'required|date',
            'phone' => 'required|string|max:20',
        ]);

        $user = $request->user();

        // Handle profile photo upload
        if ($request->hasFile('profile_photo')) {
            $path = $request->file('profile_photo')->store('profile-photos', 'public');
            $user->profile_photo_path = $path;
        }

        $user->birthday = $request->birthday;
        $user->phone = $request->phone;
        $user->save();

        // Refresh the session data to ensure the new photo is shown in the header
        Auth::login($user, true);

        return redirect()->route('dashboard');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}