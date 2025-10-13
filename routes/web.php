<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

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
});


Route::get('/register', function () {
    return Inertia::render('Auth/Register');
});

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\AdminController::class, 'dashboard'])->name('dashboard');
    
    // Course Management
    Route::get('/courses', [App\Http\Controllers\AdminController::class, 'courses'])->name('courses');
    Route::get('/courses/{id}', [App\Http\Controllers\AdminController::class, 'showCourse'])->name('courses.show');
    Route::get('/courses/{id}/comments', [App\Http\Controllers\AdminController::class, 'courseComments'])->name('courses.comments');
    Route::post('/courses', [App\Http\Controllers\AdminController::class, 'storeCourse'])->name('courses.store');
    Route::put('/courses/{id}', [App\Http\Controllers\AdminController::class, 'updateCourse'])->name('courses.update');
    Route::delete('/courses/{id}', [App\Http\Controllers\AdminController::class, 'deleteCourse'])->name('courses.delete');
    
    // Video Management
    Route::get('/courses/{courseId}/videos', [App\Http\Controllers\AdminController::class, 'courseVideos'])->name('courses.videos');
    Route::post('/courses/{courseId}/videos', [App\Http\Controllers\AdminController::class, 'storeVideo'])->name('videos.store');
    Route::put('/videos/{id}', [App\Http\Controllers\AdminController::class, 'updateVideo'])->name('videos.update');
    Route::delete('/videos/{id}', [App\Http\Controllers\AdminController::class, 'deleteVideo'])->name('videos.delete');
    
    // Event Management
    Route::get('/events', [App\Http\Controllers\AdminController::class, 'events'])->name('events');
    Route::post('/events', [App\Http\Controllers\AdminController::class, 'storeEvent'])->name('events.store');
    Route::put('/events/{id}', [App\Http\Controllers\AdminController::class, 'updateEvent'])->name('events.update');
    Route::delete('/events/{id}', [App\Http\Controllers\AdminController::class, 'deleteEvent'])->name('events.delete');
    
    // Category Management
    Route::get('/categories', [App\Http\Controllers\AdminController::class, 'categories'])->name('categories');
    Route::post('/categories', [App\Http\Controllers\AdminController::class, 'storeCategory'])->name('categories.store');
    Route::put('/categories/{id}', [App\Http\Controllers\AdminController::class, 'updateCategory'])->name('categories.update');
    Route::delete('/categories/{id}', [App\Http\Controllers\AdminController::class, 'deleteCategory'])->name('categories.delete');
    
    // User Management (View only)
    Route::get('/users', [App\Http\Controllers\AdminController::class, 'users'])->name('users');
});

require __DIR__.'/auth.php';

