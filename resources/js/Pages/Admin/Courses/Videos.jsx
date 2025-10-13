import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, PlayIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export default function Videos({ course, videos }) {
    console.log('✅ Videos Page Component Loaded!', { course, videos });
    const [showModal, setShowModal] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        description: '',
        video_url: '',
        video_file: null,
        duration_minutes: '',
        order: '',
        is_active: true,
    });

    const [uploadType, setUploadType] = useState('url'); // 'url' or 'file'

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('🚀 NEW CODE IS RUNNING! Using Axios now!');
        
        // Debug: Check form data
        console.log('Form data before submit:', {
            title: data.title,
            description: data.description,
            duration_minutes: data.duration_minutes,
            order: data.order,
            is_active: data.is_active,
            video_url: data.video_url,
            video_file: data.video_file,
            uploadType: uploadType
        });
        
        // Create FormData manually for file uploads
        const formData = new FormData();
        formData.append('title', data.title || '');
        formData.append('description', data.description || '');
        formData.append('duration_minutes', data.duration_minutes || '');
        formData.append('order', data.order || '');
        formData.append('is_active', data.is_active ? '1' : '0');

        if (uploadType === 'url' && data.video_url) {
            formData.append('video_url', data.video_url);
        } else if (uploadType === 'file' && data.video_file) {
            formData.append('video_file', data.video_file);
        }
        
        // Debug: Check FormData contents
        console.log('FormData contents:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        
        try {
            let url;
            if (editingVideo) {
                // For updates, use _method field
                formData.append('_method', 'PUT');
                url = `/admin/videos/${editingVideo.id}`;
            } else {
                // For new videos
                url = `/admin/courses/${course.id}/videos`;
            }
            
            console.log('Submitting to URL:', url);
            
            // Axios will automatically include CSRF token from bootstrap.js
            await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            console.log('✅ Video uploaded successfully!');
            
            // Reload the page to show the new video
            router.reload();
            setShowModal(false);
            reset();
        } catch (error) {
            console.error('Upload error:', error);
            if (error.response?.data?.errors) {
                console.error('Validation errors:', error.response.data.errors);
                alert('Validation errors: ' + JSON.stringify(error.response.data.errors));
            } else if (error.response?.status === 419) {
                alert('Session expired. Please refresh the page and try again.');
            } else {
                alert('Upload failed: ' + (error.message || 'Unknown error'));
            }
        }
    };

    const handleEdit = (video) => {
        setEditingVideo(video);
        setData({
            title: video.title,
            description: video.description || '',
            video_url: video.video_url || '',
            video_file: null,
            duration_minutes: video.duration_minutes,
            order: video.order,
            is_active: video.is_active,
        });
        // Set upload type based on existing video data
        setUploadType(video.file_path ? 'file' : 'url');
        setShowModal(true);
    };

    const handleDelete = (video) => {
        setVideoToDelete(video);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (videoToDelete) {
            destroy(route('admin.videos.delete', videoToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setVideoToDelete(null);
                }
            });
        }
    };

    const openModal = () => {
        setEditingVideo(null);
        setUploadType('url'); // Default to URL for new videos
        // Reset form with default values
        setData({
            title: '',
            description: '',
            video_url: '',
            video_file: null,
            duration_minutes: '',
            order: videos.length + 1,
            is_active: true,
        });
        setShowModal(true);
    };

    return (
        <AdminLayout>
            <Head title={`Manage Videos - ${course.title}`} />
            
            <div className="space-y-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <div className="mb-4">
                            <Link
                                href={route('admin.courses.show', course.id)}
                                className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                            >
                                ← Back to Course
                            </Link>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Course Videos</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Manage videos for: <strong>{course.title}</strong>
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            onClick={openModal}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Video
                        </button>
                    </div>
                </div>

                {videos.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <PlayIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No videos</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by adding a new video.</p>
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={openModal}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                Add Video
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {videos.map((video) => (
                                <li key={video.id}>
                                    <div className="px-4 py-4 flex items-center justify-between">
                                        <div className="flex items-center min-w-0 flex-1">
                                            <div className="flex-shrink-0">
                                                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                                    <PlayIcon className="h-6 w-6 text-blue-600" />
                                                </div>
                                            </div>
                                            <div className="ml-4 min-w-0 flex-1">
                                                <div className="flex items-center">
                                                    <span className="text-xs font-medium text-gray-500 mr-2">
                                                        #{video.order}
                                                    </span>
                                                    <div className="text-sm font-medium text-gray-900 truncate">
                                                        {video.title}
                                                    </div>
                                                    {video.is_active && (
                                                        <CheckCircleIcon className="ml-2 h-4 w-4 text-green-500" />
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500 space-y-1">
                                                    <div>
                                                        Duration: {video.duration_minutes} minutes
                                                        {video.description && (
                                                            <span className="ml-2">• {video.description}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center text-xs">
                                                        {video.file_path ? (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                📁 {video.original_filename}
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                🔗 External URL
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(video)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(video)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Add/Edit Video Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    {editingVideo ? 'Edit Video' : 'Add New Video'}
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={3}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Video Source *
                                        </label>
                                        
                                        {/* Upload Type Selection */}
                                        <div className="flex space-x-4 mb-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value="url"
                                                    checked={uploadType === 'url'}
                                                    onChange={(e) => setUploadType(e.target.value)}
                                                    className="mr-2"
                                                />
                                                Video URL
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value="file"
                                                    checked={uploadType === 'file'}
                                                    onChange={(e) => setUploadType(e.target.value)}
                                                    className="mr-2"
                                                />
                                                Upload File
                                            </label>
                                        </div>

                                        {/* URL Input */}
                                        {uploadType === 'url' && (
                                            <div>
                                                <input
                                                    type="url"
                                                    value={data.video_url}
                                                    onChange={(e) => setData('video_url', e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="https://example.com/video.mp4"
                                                    required={uploadType === 'url'}
                                                />
                                                {errors.video_url && <p className="mt-1 text-sm text-red-600">{errors.video_url}</p>}
                                            </div>
                                        )}

                                        {/* File Upload */}
                                        {uploadType === 'file' && (
                                            <div>
                                                <input
                                                    type="file"
                                                    accept=".mp4,.avi,.mov,.wmv,.flv,.webm"
                                                    onChange={(e) => setData('video_file', e.target.files[0])}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    required={uploadType === 'file' && !editingVideo}
                                                />
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Supported formats: MP4, AVI, MOV, WMV, FLV, WebM (Max: 1GB)
                                                </p>
                                                {editingVideo && editingVideo.file_path && (
                                                    <p className="mt-1 text-sm text-blue-600">
                                                        Current: {editingVideo.original_filename}
                                                    </p>
                                                )}
                                                {errors.video_file && <p className="mt-1 text-sm text-red-600">{errors.video_file}</p>}
                                            </div>
                                        )}
                                        
                                        {errors.video && <p className="mt-1 text-sm text-red-600">{errors.video}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Duration (minutes) *
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={data.duration_minutes}
                                                onChange={(e) => setData('duration_minutes', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Order *
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={data.order}
                                                onChange={(e) => setData('order', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {editingVideo && (
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="is_active"
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                                Active (visible to students)
                                            </label>
                                        </div>
                                    )}

                                    <div className="flex justify-end space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {editingVideo ? 'Update' : 'Create'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Delete Video
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Are you sure you want to delete "{videoToDelete?.title}"? This action cannot be undone.
                                </p>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteModal(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={confirmDelete}
                                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}