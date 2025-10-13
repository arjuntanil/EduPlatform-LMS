<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCourseController extends Controller
{
    public function show($id)
    {
        $course = Course::with(['category'])->findOrFail($id);
        $comments = $course->comments()->with('user')->get();

        return Inertia::render('Admin/Courses/Show', [
            'course' => $course,
            'comments' => $comments
        ]);
    }
}