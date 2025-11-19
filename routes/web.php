<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\CourseController::class, 'landing'])->name('landing');

// API routes for landing page
Route::get('/api/courses', [App\Http\Controllers\CourseController::class, 'apiCourses'])->name('api.courses');
Route::get('/api/testimonials', [App\Http\Controllers\CourseController::class, 'apiTestimonials'])->name('api.testimonials');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\CourseController::class, 'index'])->name('dashboard');

    Route::get('/courses', [App\Http\Controllers\CourseController::class, 'index'])->name('courses');
    Route::get('/courses/{id}', [App\Http\Controllers\CourseController::class, 'show'])->name('courses.show');
    Route::post('/courses/{id}/comments', [App\Http\Controllers\CourseController::class, 'addComment'])->name('courses.comments.store');
    Route::put('/comments/{comment}', [App\Http\Controllers\CourseController::class, 'updateComment'])->name('comments.update');
    Route::delete('/comments/{comment}', [App\Http\Controllers\CourseController::class, 'deleteComment'])->name('comments.delete');
    
    // Video viewing and progress tracking
    Route::get('/courses/{id}/videos', [App\Http\Controllers\CourseController::class, 'courseVideos'])->name('courses.videos');
    Route::post('/videos/{id}/progress', [App\Http\Controllers\CourseController::class, 'updateVideoProgress'])->name('videos.progress');
    Route::get('/videos/{id}/serve', [App\Http\Controllers\CourseController::class, 'serveVideo'])->name('videos.serve');
    Route::post('/courses/{id}/enroll', [App\Http\Controllers\CourseController::class, 'enroll'])->name('courses.enroll');
    Route::delete('/courses/{id}/unenroll', [App\Http\Controllers\CourseController::class, 'unenroll'])->name('courses.unenroll');
    Route::get('/my-learning', [App\Http\Controllers\CourseController::class, 'myLearning'])->name('my-learning');
    Route::get('/faculty', [App\Http\Controllers\FacultyController::class, 'index'])->name('faculty');
    Route::get('/events', [App\Http\Controllers\EventController::class, 'index'])->name('events');
    
    // Profile completion route
    Route::get('/profile/complete', [ProfileController::class, 'complete'])->name('profile.complete');
    Route::post('/profile/complete', [ProfileController::class, 'storeComplete'])->name('profile.complete.store');
});

// Authentication Routes are now handled by auth.php
require __DIR__.'/auth.php';

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Profile photo update
    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])->name('profile.photo.update');
});