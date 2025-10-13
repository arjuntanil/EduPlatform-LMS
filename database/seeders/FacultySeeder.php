<?php

namespace Database\Seeders;

use App\Models\Faculty;
use Illuminate\Database\Seeder;

class FacultySeeder extends Seeder
{
    public function run(): void
    {
        $defaultImage = '/images/faculty/default-profile.png';

        Faculty::updateOrCreate(
            ['email' => 'Mr..Raghavendra.Upadhyay@university.com'],
            [
                'name' => 'Mr. Raghavendra Upadhyay',
                'role' => 'Professor of Computer Science',
                'description' => 'Dr. John has over 20 years of experience in software engineering and has worked with several leading tech companies.',
                'image_url' => $defaultImage,
            ]
        );

        Faculty::updateOrCreate(
            ['email' => 'Prof..Shalini.Singh@university.com'],
            [
                'name' => 'Prof. Shalini Singh',
                'role' => 'Assistant Professor of Data Science',
                'description' => 'Prof. Jane specializes in artificial intelligence and machine learning, with numerous research papers in top journals.',
                'image_url' => $defaultImage,
            ]
        );

        Faculty::updateOrCreate(
            ['email' => 'Mr..Samuel.Harris@university.com'],
            [
                'name' => 'Mr. Samuel Harris',
                'role' => 'Lecturer in Web Development',
                'description' => 'Mr. Samuel has a passion for web development and has worked on various real-world projects involving React and Node.js.',
                'image_url' => $defaultImage,
            ]
        );
    }
}



