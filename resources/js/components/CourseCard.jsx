import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { PlayCircleIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export default function CourseCard({ course }) {
    // Add safety checks for course data
    if (!course || typeof course !== 'object') {
        return null; // Don't render if course data is invalid
    }
    
    const { props } = usePage();
    const enrolledIds = props.enrolledCourseIds || [];
    const isEnrolled = enrolledIds.includes(course.id);
    const [showEnroll, setShowEnroll] = useState(false);

    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        job_role: '',
        reason: '',
    });

    const submitEnroll = (e) => {
        e.preventDefault();
        post(route('courses.enroll', course.id), {
            preserveScroll: true,
            onSuccess: () => setShowEnroll(false),
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
                {course.image ? (
                    <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-48 object-cover"
                    />
                ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-48 flex items-center justify-center">
                        <span className="text-gray-500">Course Image</span>
                    </div>
                )}
                <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-blue-600">
                        {course.category?.name || course.category}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[56px]">
                    {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2 min-h-[48px]">
                    {course.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="block text-sm text-gray-500 mb-1">Duration</span>
                        <span className="font-semibold text-gray-900">{course.duration}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="block text-sm text-gray-500 mb-1">Level</span>
                        <span className="font-semibold text-gray-900">{course.level}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Price</span>
                        <span className="text-2xl font-bold text-gray-900">
                            {course.price === 'Free' ? 'Free' : `₹${course.price}`}
                        </span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Link
                            href={route('courses.show', course.id)}
                            className="px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-center"
                        >
                            Course Details
                        </Link>
                        {isEnrolled ? (
                            <div className="space-y-2">
                                {course.has_videos ? (
                                    <Link
                                        href={route('courses.videos', course.id)}
                                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-sm font-medium rounded-lg text-white hover:bg-blue-700 transition-colors w-full"
                                    >
                                        <PlayCircleIcon className="h-4 w-4 mr-1" />
                                        Go to Class
                                    </Link>
                                ) : (
                                    <span className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-sm font-medium rounded-lg text-gray-600 cursor-default w-full">
                                        <BookOpenIcon className="h-4 w-4 mr-1" />
                                        Materials Coming Soon
                                    </span>
                                )}
                                <span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-xs font-medium rounded-full text-green-800 cursor-default">
                                    ✓ Enrolled
                                </span>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowEnroll(true)}
                                className="px-4 py-2 bg-orange-500 text-sm font-medium rounded-lg text-white hover:bg-orange-600 transition-colors"
                            >
                                Enroll Now
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <Modal show={showEnroll} onClose={() => setShowEnroll(false)} maxWidth="xl">
                <div className="relative p-6">
                    <button
                        type="button"
                        onClick={() => setShowEnroll(false)}
                        className="absolute right-4 top-4 inline-flex items-center justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-orange-600 focus:outline-none"
                    >
                        Close
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Enroll in {course.title}</h2>
                    <p className="text-gray-600 mb-6">Please provide your details to proceed.</p>

                    <form onSubmit={submitEnroll} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                            <select
                                value={data.job_role}
                                onChange={(e) => setData('job_role', e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 bg-white focus:border-orange-500 focus:outline-none focus:ring"
                            >
                                <option value="" disabled>Choose a role</option>
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Student">Student</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Why are you taking this course?</label>
                            <textarea
                                value={data.reason}
                                onChange={(e) => setData('reason', e.target.value)}
                                required
                                rows={4}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring"
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`inline-flex items-center px-6 py-2.5 rounded-lg font-semibold text-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                Enroll
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}