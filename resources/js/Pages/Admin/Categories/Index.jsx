import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, TagIcon } from '@heroicons/react/24/outline';

export default function AdminCategories({ categories }) {
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        description: '',
        color: '#3B82F6',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingCategory) {
            put(route('admin.categories.update', editingCategory.id), {
                onSuccess: () => {
                    setShowModal(false);
                    setEditingCategory(null);
                    reset();
                }
            });
        } else {
            post(route('admin.categories.store'), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setData({
            name: category.name,
            description: category.description || '',
            color: category.color,
        });
        setShowModal(true);
    };

    const handleDelete = (category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            destroy(route('admin.categories.delete', categoryToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setCategoryToDelete(null);
                }
            });
        }
    };

    const openModal = () => {
        setEditingCategory(null);
        reset();
        setShowModal(true);
    };

    return (
        <AdminLayout>
            <Head title="Manage Categories" />
            
            <div className="space-y-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
                        <p className="mt-2 text-sm text-gray-700">Create and manage course categories.</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            onClick={openModal}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Category
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div 
                                        className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: category.color + '20' }}
                                    >
                                        <TagIcon 
                                            className="h-6 w-6" 
                                            style={{ color: category.color }}
                                        />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {category.name}
                                        </h3>
                                        {category.description && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category)}
                                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}