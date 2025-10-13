<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Category;
use App\Models\Event;
use App\Models\User;
use App\Models\Enrollment;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function showCourse($id)
    {
        $course = Course::select([
            'courses.id',
            'courses.title',
            'courses.description',
            'courses.about',
            'courses.instructor_name',
            'courses.instructor_description',
            'courses.program_outcomes',
            'courses.price',
            'courses.duration',
            'courses.level',
            'courses.category_id',
            'courses.image',
            'categories.name as category_name'
        ])
        ->leftJoin('categories', 'courses.category_id', '=', 'categories.id')
        ->where('courses.id', $id)
        ->firstOrFail();

        $comments = Comment::with(['user:id,name'])
            ->where('course_id', $id)
            ->latest()
            ->get(['id','user_id','course_id','body','rating','created_at']);

        // Get video statistics
        $videoStats = \App\Models\Video::where('course_id', $id)
            ->selectRaw('
                COUNT(*) as total_videos,
                COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_videos,
                SUM(duration_minutes) as total_duration
            ')
            ->first();

        $formattedCourse = [
            'id' => $course->id,
            'title' => $course->title,
            'description' => $course->description,
            'about' => $course->about,
            'instructor_name' => $course->instructor_name,
            'instructor_description' => $course->instructor_description,
            'program_outcomes' => $course->program_outcomes,
            'price' => $course->price,
            'duration' => $course->duration,
            'level' => $course->level,
            'category_id' => $course->category_id,
            'image' => $course->image,
            'category' => ['name' => $course->category_name],
            'video_stats' => [
                'total_videos' => $videoStats->total_videos ?? 0,
                'active_videos' => $videoStats->active_videos ?? 0,
                'total_duration' => $videoStats->total_duration ?? 0
            ]
        ];

        return Inertia::render('Admin/Courses/Show', [
            'course' => $formattedCourse,
            'comments' => $comments
        ]);
    }

    public function dashboard()
    {
        $stats = [
            'total_courses' => Course::count(),
            'total_users' => User::count(),
            'total_events' => Event::count(),
            'total_enrollments' => Enrollment::count(),
        ];

        $recent_courses = Course::select([
            'courses.id',
            'courses.title',
            'courses.description',
            'courses.price',
            'courses.duration',
            'courses.level',
            'courses.category_id',
            'categories.name as category_name'
        ])
        ->leftJoin('categories', 'courses.category_id', '=', 'categories.id')
        ->latest('courses.created_at')
        ->take(5)
        ->get()
        ->map(function ($course) {
            return [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'price' => $course->price,
                'duration' => $course->duration,
                'level' => $course->level,
                'category_id' => $course->category_id,
                'category' => ['name' => $course->category_name]
            ];
        });
        
        $recent_users = User::latest()->take(5)->get();
        $recent_events = Event::latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_courses' => $recent_courses,
            'recent_users' => $recent_users,
            'recent_events' => $recent_events,
        ]);
    }

    // Course Management
    public function courses()
    {
        $courses = Course::select([
            'courses.id',
            'courses.title',
            'courses.description',
            'courses.about',
            'courses.instructor_name',
            'courses.instructor_description',
            'courses.program_outcomes',
            'courses.price',
            'courses.duration',
            'courses.level',
            'courses.category_id',
            'courses.image',
            'categories.name as category_name'
        ])
        ->leftJoin('categories', 'courses.category_id', '=', 'categories.id')
        ->withCount(['comments', 'videos'])
        ->latest('courses.created_at')
        ->get()
        ->map(function ($course) {
            return [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'about' => $course->about,
                'instructor_name' => $course->instructor_name,
                'instructor_description' => $course->instructor_description,
                'program_outcomes' => $course->program_outcomes,
                'price' => $course->price,
                'duration' => $course->duration,
                'level' => $course->level,
                'category_id' => $course->category_id,
                'image' => $course->image,
                'comments_count' => $course->comments_count,
                'videos_count' => $course->videos_count,
                'category' => ['name' => $course->category_name]
            ];
        });

        $categories = Category::select('id', 'name')->orderBy('name')->get();
        
        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses,
            'categories' => $categories,
        ]);
    }

    public function storeCourse(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'about' => 'nullable|string',
            'instructor_name' => 'nullable|string|max:255',
            'instructor_description' => 'nullable|string',
            'program_outcomes' => 'nullable|string',
            'price' => 'required|string',
            'duration' => 'required|string',
            'level' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|string',
        ]);

        Course::create($validated);

        return redirect()->route('admin.courses')->with('success', 'Course created successfully!');
    }

    public function updateCourse(Request $request, $id)
    {
        $course = Course::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'about' => 'nullable|string',
            'instructor_name' => 'nullable|string|max:255',
            'instructor_description' => 'nullable|string',
            'program_outcomes' => 'nullable|string',
            'price' => 'required|string',
            'duration' => 'required|string',
            'level' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|string',
        ]);

        $course->update($validated);

        return redirect()->route('admin.courses')->with('success', 'Course updated successfully!');
    }

    public function deleteCourse($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return redirect()->route('admin.courses')->with('success', 'Course deleted successfully!');
    }

    // Event Management
    public function events()
    {
        $events = Event::latest()->get();
        
        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
        ]);
    }

    public function storeEvent(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
        ]);

        Event::create($validated);

        return redirect()->route('admin.events')->with('success', 'Event created successfully!');
    }

    public function updateEvent(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
        ]);

        $event->update($validated);

        return redirect()->route('admin.events')->with('success', 'Event updated successfully!');
    }

    public function deleteEvent($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return redirect()->route('admin.events')->with('success', 'Event deleted successfully!');
    }

    // Category Management
    public function categories()
    {
        $categories = Category::latest()->get();
        
        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['color'] = $validated['color'] ?? '#3B82F6';

        Category::create($validated);

        return redirect()->route('admin.categories')->with('success', 'Category created successfully!');
    }

    public function updateCategory(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
            'description' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category->update($validated);

        return redirect()->route('admin.categories')->with('success', 'Category updated successfully!');
    }

    public function deleteCategory($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->route('admin.categories')->with('success', 'Category deleted successfully!');
    }

    // User Management (View only)
    public function users()
    {
        $users = User::withCount('enrollments')->latest()->get();
        
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function courseComments($id)
    {
        $course = Course::findOrFail($id);
        $comments = Comment::with('user:id,name')
            ->where('course_id', $id)
            ->latest()
            ->get(['id','user_id','course_id','body','created_at']);

        return Inertia::render('Admin/Courses/Comments', [
            'course' => $course,
            'comments' => $comments,
        ]);
    }

    // Video Management Methods
    public function courseVideos($courseId)
    {
        $course = Course::findOrFail($courseId);
        $videos = $course->videos()->orderBy('order')->get();

        return Inertia::render('Admin/Courses/Videos', [
            'course' => $course,
            'videos' => $videos,
        ]);
    }

    public function storeVideo(Request $request, $courseId)
    {
        $course = Course::findOrFail($courseId);

        // Debug: Log incoming request data
        \Log::info('Video Upload Request:', [
            'all_data' => $request->all(),
            'files' => $request->allFiles(),
            'title' => $request->input('title'),
            'has_file' => $request->hasFile('video_file'),
        ]);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'nullable|url',
            'video_file' => 'nullable|mimes:mp4,avi,mov,wmv,flv,webm,mkv|max:1048576', // 1GB max (1024MB * 1024KB)
            'duration_minutes' => 'required|integer|min:1',
            'order' => 'required|integer|min:1',
        ]);

        // Ensure either video_url or video_file is provided
        if (empty($validated['video_url']) && !$request->hasFile('video_file')) {
            return back()->withErrors(['video' => 'Either provide a video URL or upload a video file.']);
        }

        $videoData = $validated;
        unset($videoData['video_file']); // Remove from data array as we'll handle it separately

        // Handle file upload
        if ($request->hasFile('video_file')) {
            $file = $request->file('video_file');
            $originalName = $file->getClientOriginalName();
            $fileName = time() . '_' . $originalName;
            
            // Store file in videos disk
            $filePath = $file->storeAs('', $fileName, 'videos');
            
            $videoData['file_path'] = $filePath;
            $videoData['original_filename'] = $originalName;
            $videoData['file_size'] = $file->getSize();
            $videoData['mime_type'] = $file->getMimeType();
            $videoData['video_url'] = null; // Clear URL if file is uploaded
        }

        $course->videos()->create($videoData);

        return back()->with('success', 'Video added successfully');
    }

    public function updateVideo(Request $request, $id)
    {
        $video = \App\Models\Video::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'nullable|url',
            'video_file' => 'nullable|mimes:mp4,avi,mov,wmv,flv,webm,mkv|max:1048576', // 1GB max (1024MB * 1024KB)
            'duration_minutes' => 'required|integer|min:1',
            'order' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);

        // Ensure either video_url or video_file is provided (or keep existing)
        if (empty($validated['video_url']) && !$request->hasFile('video_file') && empty($video->video_url) && empty($video->file_path)) {
            return back()->withErrors(['video' => 'Either provide a video URL or upload a video file.']);
        }

        $videoData = $validated;
        unset($videoData['video_file']); // Remove from data array

        // Handle file upload
        if ($request->hasFile('video_file')) {
            // Delete old file if exists
            if ($video->file_path && \Storage::disk('videos')->exists($video->file_path)) {
                \Storage::disk('videos')->delete($video->file_path);
            }

            $file = $request->file('video_file');
            $originalName = $file->getClientOriginalName();
            $fileName = time() . '_' . $originalName;
            
            // Store new file
            $filePath = $file->storeAs('', $fileName, 'videos');
            
            $videoData['file_path'] = $filePath;
            $videoData['original_filename'] = $originalName;
            $videoData['file_size'] = $file->getSize();
            $videoData['mime_type'] = $file->getMimeType();
            $videoData['video_url'] = null; // Clear URL if file is uploaded
        }

        $video->update($videoData);

        return back()->with('success', 'Video updated successfully');
    }

    public function deleteVideo($id)
    {
        $video = \App\Models\Video::findOrFail($id);
        $video->delete();

        return back()->with('success', 'Video deleted successfully');
    }
}