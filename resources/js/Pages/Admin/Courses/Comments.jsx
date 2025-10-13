import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Comments({ course, comments }) {
    return (
        <AuthenticatedLayout>
            <Head title={`Comments - ${course.title}`} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Comments for: {course.title}</h1>
                    <Link href={route('admin.courses')} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300">Back to Courses</Link>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    {comments.length === 0 && (
                        <p className="text-gray-500">No comments yet.</p>
                    )}
                    <div className="space-y-4">
                        {comments.map((c) => (
                            <div key={c.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="text-sm text-gray-600 mb-1">
                                    <span className="font-medium text-gray-800">{c.user?.name ?? 'User'}</span>
                                    <span className="ml-2">{new Date(c.created_at).toLocaleString()}</span>
                                </div>
                                <div className="text-gray-800 whitespace-pre-line">{c.body}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


