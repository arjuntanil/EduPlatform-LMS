<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Inertia\Inertia;

class FacultyController extends Controller
{
    public function index()
    {
        $faculties = Faculty::query()->orderBy('name')->get();

        return Inertia::render('Faculty/Index', [
            'faculties' => $faculties,
        ]);
    }
}



