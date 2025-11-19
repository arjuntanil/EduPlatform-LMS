import React from 'react';
import { Link } from '@inertiajs/react';

const Courses = ({ courses = [] }) => {
    // If no courses are provided, use sample data
    const sampleCourses = [
        {
            id: 1,
            title: 'Complete Python Bootcamp',
            category: 'Python',
            rating: 4.8,
            students: 12500,
            price: 0,
            image: '/images/courses/courseone.png'
        },
        {
            id: 2,
            title: 'Advanced React Development',
            category: 'React',
            rating: 4.9,
            students: 8900,
            price: 4999,
            image: '/images/courses/coursetwo.png'
        },
        {
            id: 3,
            title: 'Data Science with Python',
            category: 'Data Science',
            rating: 4.7,
            students: 15600,
            price: 0,
            image: '/images/courses/coursethree.png'
        }
    ];

    const coursesToDisplay = courses.length > 0 ? courses : sampleCourses;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Courses</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover our most popular courses loved by thousands of students
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coursesToDisplay.map((course) => (
                        <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                            <div className="relative">
                                <img 
                                    src={course.image} 
                                    alt={course.title} 
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-blue-600">
                                        {course.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {course.title}
                                </h3>
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center mr-4">
                                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="ml-1 text-gray-600">{course.rating}</span>
                                    </div>
                                    <span className="text-gray-600">{course.students} students</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900">
                                        {course.price === 0 ? 'Free' : `₹${course.price}`}
                                    </span>
                                    <Link 
                                        href={`/courses/${course.id}`} 
                                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link 
                        href="/login" 
                        className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                    >
                        View All Courses
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Courses;