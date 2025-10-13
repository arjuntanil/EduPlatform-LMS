import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CourseCard from '@/Components/CourseCard';

export default function Index({ courses }) {
    return (
        <AuthenticatedLayout>
            <Head title="Courses" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Courses</h1>
                        <p className="text-xl text-gray-600">Browse our selection of courses and start learning today</p>
                    </div>

                    {/* Category Filters */}
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium hover:bg-blue-200">
                                All Courses
                            </button>
                            <button className="px-4 py-2 rounded-full text-gray-600 font-medium hover:bg-gray-100">
                                Python
                            </button>
                            <button className="px-4 py-2 rounded-full text-gray-600 font-medium hover:bg-gray-100">
                                Web Development
                            </button>
                            <button className="px-4 py-2 rounded-full text-gray-600 font-medium hover:bg-gray-100">
                                Cyber Security
                            </button>
                        </div>
                    </div>

                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}