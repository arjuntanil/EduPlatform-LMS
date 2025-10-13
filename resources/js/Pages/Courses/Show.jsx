import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import StarRating from '@/Components/StarRating';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Show({ course, isEnrolled, comments = [] }) {
    const [showEnroll, setShowEnroll] = useState(false);
    const [editingComment, setEditingComment] = useState(null);
    const { props } = usePage();
    const currentUserId = props.auth.user?.id;
    
    const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        job_role: '',
        reason: '',
        body: '',
        rating: 1,
    });

    const submitEnroll = (e) => {
        e.preventDefault();
        post(route('courses.enroll', course.id), {
            preserveScroll: true,
            onSuccess: () => setShowEnroll(false),
        });
    };

    const submitComment = (e) => {
        e.preventDefault();
        post(route('courses.comments.store', course.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setData({...data, body: '', rating: 1});
            },
            only: ['comments'],
        });
    };

    const startEditing = (comment) => {
        setEditingComment(comment.id);
        setData({
            ...data,
            body: comment.body,
            rating: comment.rating,
        });
    };

    const cancelEditing = () => {
        setEditingComment(null);
        reset();
        setData({...data, body: '', rating: 1});
    };

    const updateComment = (commentId) => {
        put(route('comments.update', commentId), {
            preserveScroll: true,
            onSuccess: () => {
                setEditingComment(null);
                reset();
                setData({...data, body: '', rating: 1});
            },
            only: ['comments'],
        });
    };

    const deleteComment = (commentId) => {
        if (confirm('Are you sure you want to delete this review?')) {
            destroy(route('comments.delete', commentId), {
                preserveScroll: true,
                only: ['comments'],
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Course Details - ${course.title}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Top Card */}
                <div className="bg-white rounded-xl shadow p-6 md:p-8 mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">{course.title}</h1>
                    <p className="text-gray-700 mb-6">{course.description}</p>
                    <div className="flex items-center gap-6">
                        <div className="text-gray-700">
                            <span className="mr-3">Duration: <strong>{course.duration}</strong></span>
                            <span className="mr-3">Level: <strong>{course.level}</strong></span>
                            <span>Price: <strong>{course.price === 'Free' ? 'Free' : `₹${course.price}`}</strong></span>
                        </div>
                        {isEnrolled ? (
                            <div className="ml-auto flex space-x-3">
                                <Link
                                    href={route('courses.videos', course.id)}
                                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                                >
                                    View Videos
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => router.delete(route('courses.unenroll', course.id), { preserveScroll: true })}
                                    className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
                                >
                                    Unenroll
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowEnroll(true)}
                                className="ml-auto px-5 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
                            >
                                Enroll
                            </button>
                        )}
                    </div>
                </div>

                {/* Split Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left */}
                    <div>
                        <div className="bg-white rounded-xl shadow p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this course</h2>
                            {course.about ? (
                                <div className="space-y-3 text-gray-700 whitespace-pre-line">{course.about}</div>
                            ) : (
                                <p className="text-gray-500">No additional details provided.</p>
                            )}

                            {(course.instructor_name || course.instructor_description) && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Instructor</h3>
                                    {course.instructor_name && (
                                        <p className="text-gray-800 font-medium">{course.instructor_name}</p>
                                    )}
                                    {course.instructor_description && (
                                        <p className="text-gray-700 mt-1 whitespace-pre-line">{course.instructor_description}</p>
                                    )}
                                </div>
                            )}

                            {false && course.program_outcomes && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Program Outcomes</h3>
                                    <div className="text-gray-700 whitespace-pre-line">{course.program_outcomes}</div>
                                </div>
                            )}
                        </div>
                        {/* Comments */}
                        <div className="bg-white rounded-xl shadow p-6 md:p-8 mt-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Reviews</h2>
                            <div className="space-y-4 mb-6">
                                {comments.length === 0 && (
                                    <p className="text-gray-500">No reviews yet. Be the first to review this course!</p>
                                )}
                                {comments.map((c) => (
                                    <div key={c.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="font-medium text-gray-800">{c.user?.name ?? 'User'}</span>
                                                    <StarRating rating={c.rating || 1} size="sm" />
                                                </div>
                                                <span className="text-sm text-gray-500">{new Date(c.created_at).toLocaleString()}</span>
                                            </div>
                                            {currentUserId === c.user_id && (
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => startEditing(c)}
                                                        className="text-blue-600 hover:text-blue-800 p-1"
                                                        title="Edit review"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteComment(c.id)}
                                                        className="text-red-600 hover:text-red-800 p-1"
                                                        title="Delete review"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        {editingComment === c.id ? (
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                                    <StarRating 
                                                        rating={data.rating} 
                                                        onRatingChange={(rating) => setData('rating', rating)}
                                                        editable={true}
                                                        size="md"
                                                    />
                                                </div>
                                                <textarea
                                                    value={data.body}
                                                    onChange={(e) => setData('body', e.target.value)}
                                                    required
                                                    rows={3}
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring"
                                                    placeholder="Update your review..."
                                                />
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => updateComment(c.id)}
                                                        disabled={processing}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        onClick={cancelEditing}
                                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-gray-800 whitespace-pre-line">{c.body}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {editingComment === null && (
                                <form onSubmit={submitComment} className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">Add your review</label>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
                                        <StarRating 
                                            rating={data.rating} 
                                            onRatingChange={(rating) => setData('rating', rating)}
                                            editable={true}
                                            size="md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Review *</label>
                                        <textarea
                                            value={data.body}
                                            onChange={(e) => setData('body', e.target.value)}
                                            required
                                            rows={3}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring"
                                            placeholder="Share your thoughts about this course..."
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" disabled={processing} className={`inline-flex items-center px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-orange-500 hover:bg-orange-600 ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                            Post Review
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Right */}
                    <div>
                        <div className="bg-white rounded-xl shadow p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Our LMS Courses</h2>
                            <p className="text-gray-700 mb-6 whitespace-pre-line">
                                Our LMS platform offers affordable and high-quality learning opportunities to boost your career! Here’s what you need to know about our course access and rewards:

Affordable Fee: Enroll in our courses for just ₹108 + GST.
Exclusive Offer: Achieve 95% or more in the exam, and you'll be eligible for an exclusive 65% discount on all courses.
Certification: Pass the test and earn a prestigious Certificate of Achievement, a testament to your hard work and knowledge.
Don’t miss this opportunity to learn, excel, and save while enhancing your skills!
                            </p>
                            <button type="button" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                                Get Mock Test
                            </button>
                        </div>
                    </div>
                </div>
                {course.program_outcomes && (
                    <div className="mt-8">
                        <div className="w-full rounded-2xl shadow-lg p-6 md:p-10 bg-gradient-to-r from-sky-300 via-sky-200 to-green-200 border border-white/40">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">Program Outcome</h2>
                            <div className="text-gray-800 leading-relaxed whitespace-pre-line text-base md:text-lg">
                                {course.program_outcomes}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showEnroll && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
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
                                <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                                <select value={data.job_role} onChange={(e) => setData('job_role', e.target.value)} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 bg-white focus:border-orange-500 focus:outline-none focus:ring">
                                    <option value="" disabled>Choose a role</option>
                                    <option value="Software Engineer">Software Engineer</option>
                                    <option value="Student">Student</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Why are you taking this course?</label>
                                <textarea value={data.reason} onChange={(e) => setData('reason', e.target.value)} required rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:border-orange-500 focus:outline-none focus:ring" />
                            </div>
                            <div className="flex justify-end pt-2">
                                <button type="submit" disabled={processing} className={`inline-flex items-center px-6 py-2.5 rounded-lg font-semibold text-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                    Enroll
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}


