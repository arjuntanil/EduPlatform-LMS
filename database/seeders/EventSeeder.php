<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            [
                'title' => 'Tech Talk: AI Innovations',
                'date' => '2024-12-10',
                'description' => 'Join us for a fascinating session on AI innovations by industry experts.',
            ],
            [
                'title' => 'Workshop: Web Development Bootcamp',
                'date' => '2024-12-15',
                'description' => 'A hands-on workshop covering web development essentials like HTML, CSS, and JavaScript.',
            ],
            [
                'title' => 'Seminar: Data Science and Machine Learning',
                'date' => '2024-12-20',
                'description' => 'Dive into the world of data science and machine learning with expert-led sessions.',
            ],
        ];

        foreach ($events as $eventData) {
            Event::updateOrCreate(
                ['title' => $eventData['title']],
                $eventData
            );
        }
    }
}
