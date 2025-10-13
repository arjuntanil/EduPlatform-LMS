<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Category;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        // Get category IDs
        $sqlCategory = Category::where('name', 'SQL')->first();
        $pythonCategory = Category::where('name', 'Python')->first();
        $cyberSecurityCategory = Category::where('name', 'Cyber Security')->first();

        $courses = [
            [
                'title' => 'Certificate Course in Structured Query Language using MySQL',
                'category_id' => $sqlCategory ? $sqlCategory->id : null,
                'description' => 'Learn the fundamentals of SQL and how to manage databases effectively.',
                'price' => 'Free',
                'image' => '/images/courses/sql.jpg',
                'duration' => '8 weeks',
                'level' => 'Beginner',
                'about' => 'The Certificate Course in Structured Query Language (SQL) using MySQL is designed to provide students with a strong foundation in database concepts and practical SQL skills. Through this course, learners will understand how to store, retrieve, and manipulate data efficiently using MySQL — one of the most popular relational database systems in the world. Participants will gain hands-on experience in writing SQL queries, creating tables, managing relationships, and implementing database operations essential for real-world applications in data management and software development.',
                'instructor_name' => 'Mr. Shaym Sundar',
                'instructor_description' => 'Mr. Shyam Sundar is an experienced software developer and educator with expertise in database management systems, web development, and data analytics. With a passion for teaching and practical learning, he has guided numerous students in mastering SQL and database technologies. His teaching approach focuses on clear concepts, hands-on practice, and real-world problem-solving to prepare learners for the IT industry.',
                'program_outcomes' => 'Understand the fundamental concepts of Relational Database Management Systems (RDBMS). Write and execute SQL queries to create, modify, and retrieve data from databases. Use MySQL Workbench or command-line tools for database operations. Design and implement normalized database structures. Apply JOIN operations, subqueries, and aggregate functions for data analysis. Manage user privileges, constraints, and transactions to ensure data security and integrity. Develop confidence to work with databases in real-world projects and integrate SQL with applications.',
            ],
            [
                'title' => 'Introduction to Python',
                'category_id' => $pythonCategory ? $pythonCategory->id : null,
                'description' => 'Get started with Python programming, covering basic concepts and practical applications.',
                'price' => 'Free',
                'image' => '/images/courses/python.jpg',
                'duration' => '6 weeks',
                'level' => 'Beginner',
            ],
            [
                'title' => 'Advanced Program in Cyber Security',
                'category_id' => $cyberSecurityCategory ? $cyberSecurityCategory->id : null,
                'description' => 'Deep dive into advanced concepts in Cyber Security and threat management.',
                'price' => '4590',
                'image' => '/images/courses/cyber-security.jpg',
                'duration' => '12 weeks',
                'level' => 'Advanced',
            ],
        ];

        foreach ($courses as $courseData) {
            Course::updateOrCreate(
                ['title' => $courseData['title']],
                $courseData
            );
        }
    }
}
