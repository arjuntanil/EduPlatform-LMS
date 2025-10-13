import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import CourseCard from '@/Components/CourseCard';

export default function MyLearning({ enrolledCourses }) {
    const courses = enrolledCourses || [];

    return (
        <AuthenticatedLayout>
            <Head title="My Learning" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Learning</h1>
                        <p className="text-xl text-gray-600">Track your progress and continue learning</p>
                    </div>
                    {courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No enrolled courses</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by enrolling in a course.</p>
                            <div className="mt-6">
                                <Link href={route('courses.index')} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                    Browse Courses
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
