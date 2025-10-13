<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::query()
            ->orderBy('date')
            ->get();

        return Inertia::render('Events/Index', [
            'events' => $events,
        ]);
    }
}
