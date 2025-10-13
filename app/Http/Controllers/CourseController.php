<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Enrollment;
use App\Models\Course;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Video;
use App\Models\VideoProgress;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    private $courses = [
        [
            'id' => 1,
            'title' => 'Certificate Course in Structured Query Language using MySQL',
            'category' => 'SQL',
            'description' => 'Learn the fundamentals of SQL and how to manage databases effectively.',
            'price' => 'Free',
            'image' => '/images/courses/sql.jpg',
            'duration' => '8 weeks',
            'level' => 'Beginner',
            'enrolled' => 0,
        ],
        [
            'id' => 2,
            'title' => 'Introduction to Python',
            'category' => 'Python',
            'description' => 'Get started with Python programming, covering basic concepts and practical applications.',
            'price' => 'Free',
            'image' => '/images/courses/python.jpg',
            'duration' => '6 weeks',
            'level' => 'Beginner',
            'enrolled' => 0,
        ],
        [
            'id' => 3,
            'title' => 'Advanced Program in Cyber Security',
            'category' => 'Cyber Security',
            'description' => 'Deep dive into advanced concepts in Cyber Security and threat management.',
            'price' => '4590',
            'image' => '/images/courses/cyber-security.jpg',
            'duration' => '12 weeks',
            'level' => 'Advanced',
            'enrolled' => 0,
        ],
    ];

    public function index()
    {
        $courses = Course::with(['videos' => function($query) {
                $query->where('is_active', true);
            }])
            ->select([
                'courses.id',
                'courses.title',
                'courses.description',
                'courses.price',
                'courses.image',
                'courses.duration',
                'courses.level',
                'courses.category_id',
                'categories.name as category_name'
            ])
            ->leftJoin('categories', 'courses.category_id', '=', 'categories.id')
            ->orderBy('courses.title')
            ->get()
            ->map(function ($course) {
                return [
                    'id' => $course->id ?? null,
                    'title' => $course->title ?? '',
                    'description' => $course->description ?? '',
                    'price' => $course->price ?? 'Free',
                    'image' => $course->image ?? '',
                    'duration' => $course->duration ?? '',
                    'level' => $course->level ?? 'Beginner',
                    'category_id' => $course->category_id ?? null,
                    'category' => [
                        'name' => $course->category_name ?? 'Uncategorized'
                    ],
                    'videos_count' => $course->videos->count(),
                    'has_videos' => $course->videos->count() > 0
                ];
            });

        $categories = Category::query()->orderBy('name')->get(['id','name'])->map(function ($category) {
            return [
                'id' => $category->id ?? null,
                'name' => $category->name ?? ''
            ];
        });
        
        return Inertia::render('Dashboard', [
            'courses' => $courses,
            'categories' => $categories,
        ]);
    }

    public function myLearning()
    {
        $user = Auth::user();
        
        // Get enrolled course IDs
        $enrolledCourseIds = Enrollment::where('user_id', $user->id)
            ->pluck('course_id');
        
        // Load complete course models with relationships
        $enrolledCourses = Course::with('category')
            ->whereIn('id', $enrolledCourseIds)
            ->get()
            ->map(function($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'description' => $course->description,
                    'price' => $course->price,
                    'duration' => $course->duration,
                    'level' => $course->level,
                    'category' => $course->category,
                    'has_videos' => $course->has_videos, // This will use the accessor
                ];
            });

        return Inertia::render('Courses/MyLearning', [
            'enrolledCourses' => $enrolledCourses,
        ]);
    }

    public function show($id)
    {
        $course = Course::with('category')->find($id);

        if (!$course) {
            abort(404);
        }

        $isEnrolled = false;
        if (Auth::check()) {
            $isEnrolled = Enrollment::query()
                ->where('user_id', Auth::id())
                ->where('course_id', $id)
                ->exists();
        }

        $comments = Comment::with('user:id,name')
            ->where('course_id', $id)
            ->latest()
            ->get(['id','user_id','course_id','body','rating','created_at']);

        return Inertia::render('Courses/Show', [
            'course' => $course,
            'isEnrolled' => $isEnrolled,
            'comments' => $comments,
        ]);
    }

    public function enroll($id)
    {
        $course = Course::with('category')->find($id);
        
        if (!$course) {
            abort(404);
        }

        $validated = request()->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'job_role' => 'required|string|max:100',
            'reason' => 'required|string',
        ]);

        Enrollment::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'course_id' => (int) $id,
            ],
            [
                'course_title' => $course->title,
                'course_category' => $course->category ? $course->category->name : null,
                'course_description' => $course->description,
                'course_price' => $course->price,
                'course_duration' => $course->duration,
                'course_level' => $course->level,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'job_role' => $validated['job_role'],
                'reason' => $validated['reason'],
            ]
        );

        return redirect()->route('my-learning')->with('success', 'Successfully enrolled in the course!');
    }

    public function unenroll($id)
    {
        $enrollment = Enrollment::where('user_id', Auth::id())
            ->where('course_id', $id)
            ->first();

        if ($enrollment) {
            $enrollment->delete();
            return redirect()->route('my-learning')->with('success', 'Successfully unenrolled from the course!');
        }

        return redirect()->route('my-learning')->with('error', 'Enrollment not found!');
    }

    public function addComment($id)
    {
        $course = Course::find($id);

        if (!$course) {
            abort(404);
        }

        $validated = request()->validate([
            'body' => 'required|string|max:2000',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        Comment::create([
            'user_id' => Auth::id(),
            'course_id' => (int) $id,
            'body' => $validated['body'],
            'rating' => $validated['rating'],
        ]);

        return back()->with('success', 'Review posted successfully');
    }

    public function updateComment(Comment $comment)
    {
        // Check if the comment belongs to the authenticated user
        if ($comment->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to update this comment');
        }

        $validated = request()->validate([
            'body' => 'required|string|max:2000',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $comment->update([
            'body' => $validated['body'],
            'rating' => $validated['rating'],
        ]);

        return back()->with('success', 'Review updated successfully');
    }

    public function deleteComment(Comment $comment)
    {
        // Check if the comment belongs to the authenticated user
        if ($comment->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to delete this comment');
        }

        $comment->delete();

        return back()->with('success', 'Review deleted successfully');
    }

    // Video Methods for Students
    public function courseVideos($id)
    {
        $course = Course::with('category')->findOrFail($id);
        
        // Check if user is enrolled
        $isEnrolled = Enrollment::where('user_id', Auth::id())
            ->where('course_id', $id)
            ->exists();

        if (!$isEnrolled) {
            return redirect()->route('courses.show', $id)
                ->with('error', 'You must be enrolled in this course to access videos.');
        }

        // Get videos with user progress
        $videos = $course->activeVideos()->get()->map(function ($video) {
            $progress = $video->getUserProgress(Auth::id());
            
            // Determine video source - uploaded file or URL
            $videoSource = null;
            if ($video->file_path) {
                // For uploaded videos, use the serve route
                $videoSource = route('videos.serve', $video->id);
            } elseif ($video->video_url) {
                // For URL videos, use the URL directly
                $videoSource = $video->video_url;
            }
            
            return [
                'id' => $video->id,
                'title' => $video->title,
                'description' => $video->description,
                'video_url' => $videoSource, // This now works for both uploaded files and URLs
                'duration_minutes' => $video->duration_minutes,
                'order' => $video->order,
                'progress' => $progress ? [
                    'watched_seconds' => $progress->watched_seconds,
                    'completed' => $progress->completed,
                    'completion_percentage' => $progress->completion_percentage,
                    'last_watched_at' => $progress->last_watched_at,
                ] : null,
            ];
        });

        return Inertia::render('Courses/Videos', [
            'course' => $course,
            'videos' => $videos,
        ]);
    }

    public function updateVideoProgress(Request $request, $id)
    {
        $video = \App\Models\Video::findOrFail($id);
        
        // Check if user is enrolled in the course
        $isEnrolled = Enrollment::where('user_id', Auth::id())
            ->where('course_id', $video->course_id)
            ->exists();

        if (!$isEnrolled) {
            abort(403, 'You must be enrolled in this course to track progress.');
        }

        $validated = $request->validate([
            'watched_seconds' => 'required|integer|min:0',
            'total_seconds' => 'required|integer|min:1',
        ]);

        $progress = \App\Models\VideoProgress::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'video_id' => $id,
            ],
            []
        );

        $progress->updateProgress(
            $validated['watched_seconds'],
            $validated['total_seconds']
        );

        return response()->json([
            'success' => true,
            'progress' => [
                'watched_seconds' => $progress->watched_seconds,
                'completed' => $progress->completed,
                'completion_percentage' => $progress->completion_percentage,
            ]
        ]);
    }

    public function serveVideo($id)
    {
        $video = Video::findOrFail($id);
        $course = $video->course;

        // Check if user is enrolled in the course
        $enrollment = Enrollment::where('user_id', Auth::id())
            ->where('course_id', $course->id)
            ->first();

        if (!$enrollment) {
            abort(403, 'You must be enrolled in this course to access videos.');
        }

        // Check if video file exists
        if (!$video->file_path || !\Storage::disk('videos')->exists($video->file_path)) {
            abort(404, 'Video file not found.');
        }

        $filePath = \Storage::disk('videos')->path($video->file_path);
        
        return response()->file($filePath, [
            'Content-Type' => $video->mime_type ?? 'video/mp4',
            'Content-Disposition' => 'inline; filename="' . $video->original_filename . '"'
        ]);
    }
}