import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, BookOpenIcon, EyeIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

export default function AdminCourses({ courses, categories }) {
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        description: '',
        about: '',
        instructor_name: '',
        instructor_description: '',
        program_outcomes: '',
        price: '',
        duration: '',
        level: '',
        category_id: '',
        image: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingCourse) {
            put(route('admin.courses.update', editingCourse.id), {
                onSuccess: () => {
                    setShowModal(false);
                    setEditingCourse(null);
                    reset();
                }
            });
        } else {
            post(route('admin.courses.store'), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setData({
            title: course.title,
            description: course.description,
            about: course.about || '',
            instructor_name: course.instructor_name || '',
            instructor_description: course.instructor_description || '',
            program_outcomes: course.program_outcomes || '',
            price: course.price,
            duration: course.duration,
            level: course.level,
            category_id: course.category_id || '',
            image: course.image || '',
        });
        setShowModal(true);
    };

    const handleDelete = (course) => {
        setCourseToDelete(course);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (courseToDelete) {
            destroy(route('admin.courses.delete', courseToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setCourseToDelete(null);
                }
            });
        }
    };

    const openModal = () => {
        setEditingCourse(null);
        reset();
        setShowModal(true);
    };

    return (
        <AdminLayout>
            <Head title="Manage Courses" />
            
            <div className="space-y-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
                        <p className="mt-2 text-sm text-gray-700">Create, edit, and manage your course catalog.</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            onClick={openModal}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Course
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {courses.map((course) => (
                            <li key={course.id}>
                                <div className="px-4 py-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <BookOpenIcon className="h-6 w-6 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="text-sm font-medium text-gray-900">
                                                {course.title}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {course.category?.name || 'No Category'} • {course.level} • {course.duration}
                                            </div>
                                            <div className="flex items-center space-x-3 mt-1">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                    <VideoCameraIcon className="w-3 h-3 mr-1" />
                                                    {course.videos_count || 0} videos
                                                </span>
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    💬 {course.comments_count || 0} reviews
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            href={route('admin.courses.show', course.id)}
                                            className="text-gray-600 hover:text-gray-900"
                                            title="View Course"
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                        </Link>
                                        <Link
                                            href={route('admin.courses.videos', course.id)}
                                            className="text-purple-600 hover:text-purple-900"
                                            title="Manage Videos"
                                        >
                                            <VideoCameraIcon className="h-4 w-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleEdit(course)}
                                            className="text-blue-600 hover:text-blue-900"
                                            title="Edit Course"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course)}
                                            className="text-red-600 hover:text-red-900"
                                            title="Delete Course"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Add/Edit Course Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    {editingCourse ? 'Edit Course' : 'Add New Course'}
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Title
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
                                            required
                                        />
                                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            About Course
                                        </label>
                                        <textarea
                                            value={data.about}
                                            onChange={(e) => setData('about', e.target.value)}
                                            rows={3}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Instructor Name
                                            </label>
                                            <input
                                                type="text"
                                                value={data.instructor_name}
                                                onChange={(e) => setData('instructor_name', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Instructor Description
                                            </label>
                                            <textarea
                                                value={data.instructor_description}
                                                onChange={(e) => setData('instructor_description', e.target.value)}
                                                rows={2}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Program Outcomes
                                        </label>
                                        <textarea
                                            value={data.program_outcomes}
                                            onChange={(e) => setData('program_outcomes', e.target.value)}
                                            rows={3}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Price
                                            </label>
                                            <input
                                                type="text"
                                                value={data.price}
                                                onChange={(e) => setData('price', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Duration
                                            </label>
                                            <input
                                                type="text"
                                                value={data.duration}
                                                onChange={(e) => setData('duration', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Level
                                            </label>
                                            <select
                                                value={data.level}
                                                onChange={(e) => setData('level', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            >
                                                <option value="">Select Level</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Category
                                            </label>
                                            <select
                                                value={data.category_id}
                                                onChange={(e) => setData('category_id', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Image URL
                                        </label>
                                        <input
                                            type="url"
                                            value={data.image}
                                            onChange={(e) => setData('image', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

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
                                            {editingCourse ? 'Update' : 'Create'}
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
                                    Delete Course
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Are you sure you want to delete "{courseToDelete?.title}"? This action cannot be undone.
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