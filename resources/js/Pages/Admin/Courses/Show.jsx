import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import StarRating from '@/Components/StarRating';

export default function ShowCourse({ course, comments }) {
    console.log('Admin Course Show Page Loading', course);
    return (
        <AdminLayout>
            <Head title={`Course: ${course.title}`} />
            
            {/* DEBUG: Show page loaded banner */}
            <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
                🎬 ADMIN COURSE DETAILS PAGE LOADED - Course ID: {course?.id}
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Back to courses button */}
                            <div className="mb-6 flex items-center justify-between">
                                <Link
                                    href={route('admin.courses')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    ← Back to Courses
                                </Link>
                                <div className="flex space-x-3">
                                    <Link
                                        href={route('admin.courses.videos', course.id)}
                                        className="inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg text-lg font-bold border-2 border-red-700"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        🎥 MANAGE VIDEOS
                                    </Link>
                                    <Link
                                        href={route('admin.courses.videos', course.id)}
                                        className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        ➕ Add New Video
                                    </Link>
                                </div>
                            </div>

                            {/* Video Management Banner */}
                            <div className="mb-6 p-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-white text-lg font-semibold mb-1">Video Management</h3>
                                        <p className="text-purple-100 text-sm">Add and manage videos for this course</p>
                                    </div>
                                    <Link
                                        href={route('admin.courses.videos', course.id)}
                                        className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold shadow-md"
                                    >
                                        🎬 Manage Course Videos
                                    </Link>
                                </div>
                            </div>

                            {/* Course details */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">Course Details</h2>
                                        <div className="space-y-2">
                                            <p><span className="font-medium">Category:</span> {course.category?.name}</p>
                                            <p><span className="font-medium">Duration:</span> {course.duration}</p>
                                            <p><span className="font-medium">Level:</span> {course.level}</p>
                                            <p><span className="font-medium">Price:</span> ${course.price}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">Video Content</h2>
                                        <div className="space-y-2">
                                            <p><span className="font-medium">Total Videos:</span> {course.video_stats?.total_videos || 0}</p>
                                            <p><span className="font-medium">Active Videos:</span> {course.video_stats?.active_videos || 0}</p>
                                            <p><span className="font-medium">Total Duration:</span> {course.video_stats?.total_duration || 0} minutes</p>
                                            <div className="mt-3">
                                                <Link
                                                    href={route('admin.courses.videos', course.id)}
                                                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Add Videos
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">Instructor</h2>
                                        <p><span className="font-medium">Name:</span> {course.instructor_name}</p>
                                        <p className="mt-2">{course.instructor_description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Comments section */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
                                    {comments && comments.length > 0 && (
                                        <div className="flex items-center space-x-2">
                                            <StarRating 
                                                rating={Math.round(comments.reduce((acc, c) => acc + (c.rating || 1), 0) / comments.length)} 
                                                size="sm" 
                                            />
                                            <span className="text-sm text-gray-600">
                                                ({(comments.reduce((acc, c) => acc + (c.rating || 1), 0) / comments.length).toFixed(1)} avg)
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {comments && comments.length > 0 ? (
                                    <div className="space-y-4">
                                        {comments.map((comment) => (
                                            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <span className="font-medium text-gray-900">
                                                                {comment.user.name}
                                                            </span>
                                                            <StarRating rating={comment.rating || 1} size="sm" />
                                                        </div>
                                                        <span className="text-gray-500 text-sm">
                                                            {new Date(comment.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700">{comment.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                                        <p className="text-gray-500">No reviews have been made on this course yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}