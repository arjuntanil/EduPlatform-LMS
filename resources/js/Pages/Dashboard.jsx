import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CourseCard from '@/Components/CourseCard';
import Hero from '@/Components/Hero';
import Companies from '@/Components/Companies';
import Mentor from '@/Components/Mentor';
import Testimonial from '@/Components/Testimonial';
import Newsletter from '@/Components/Newsletter';
import { useMemo, useState } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

export default function Dashboard({ courses = [], categories = [] }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState('all');
    
    // Ensure categories is an array and has proper structure
    const safeCategories = Array.isArray(categories) ? categories : [];
    const categoryOptions = useMemo(() => [{ id: 'all', name: 'All' }, ...safeCategories], [safeCategories]);
    
    // Ensure courses is an array and filter safely
    const safeCourses = Array.isArray(courses) ? courses : [];
    const filteredCourses = useMemo(() => {
        if (selectedCategoryId === 'all') return safeCourses;
        return safeCourses.filter((c) => {
            if (!c || typeof c !== 'object') return false;
            return String(c.category_id || '') === String(selectedCategoryId);
        });
    }, [safeCourses, selectedCategoryId]);
    
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Hero Section */}
            <Hero />

            {/* Companies Section */}
            <Companies />

            {/* Courses Section */}
            <div id="courses" className="py-16 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Course Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Courses</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Browse our wide range of free courses and start learning today!
                        </p>
                    </div>

                    {/* Category Filters */}
                    <div className="mb-12">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categoryOptions.map((cat) => {
                                const isActive = String(selectedCategoryId) === String(cat.id);
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategoryId(cat.id)}
                                        className={`px-6 py-2.5 rounded-full font-medium transition-colors ${isActive ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-700 hover:bg-white hover:shadow-sm'}`}
                                    >
                                        {cat.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Mentor Section */}
            <Mentor />

            {/* Testimonial Section */}
            <Testimonial />

            {/* Newsletter Section */}
            <Newsletter />
        </AuthenticatedLayout>
    );
}