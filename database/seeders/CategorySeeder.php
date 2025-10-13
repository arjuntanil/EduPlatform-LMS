<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'SQL',
                'slug' => 'sql',
                'description' => 'Database and SQL related courses',
                'color' => '#3B82F6',
            ],
            [
                'name' => 'Python',
                'slug' => 'python',
                'description' => 'Python programming courses',
                'color' => '#10B981',
            ],
            [
                'name' => 'Cyber Security',
                'slug' => 'cyber-security',
                'description' => 'Cybersecurity and information security courses',
                'color' => '#EF4444',
            ],
            [
                'name' => 'Web Development',
                'slug' => 'web-development',
                'description' => 'Web development and frontend courses',
                'color' => '#F59E0B',
            ],
        ];

        foreach ($categories as $categoryData) {
            Category::updateOrCreate(
                ['name' => $categoryData['name']],
                $categoryData
            );
        }
    }
}
