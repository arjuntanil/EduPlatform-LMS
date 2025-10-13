import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const CourseCard = ({ course }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <div className="flex justify-between items-center mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{course.category?.name}</span>
                <span className={`text-lg font-bold ${course.price === 'Free' ? 'text-green-600' : 'text-gray-900'}`}>
                    {course.price}
                </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex justify-between items-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Enroll Now
                </button>
                <a href="#" className="text-blue-600 font-semibold hover:underline">
                    Course Details
                </a>
            </div>
        </div>
    </div>
);

export default function Dashboard({ auth }) {
    const courses = [
        {
            "title": "Certificate Course in Structured Query Language using MySQL",
            "category": "SQL",
            "description": "Learn the fundamentals of SQL and how to manage databases effectively.",
            "price": "Free",
            "image": "https://lms.codevocado.in/static/media/sql.28503a594d1953546283.png"
        },
        {
            "title": "Introduction to Python",
            "category": "Python",
            "description": "Get started with Python programming, covering basic concepts and practical applications.",
            "price": "Free",
            "image": "https://lms.codevocado.in/static/media/python.2d3934290251c46de959.png"
        },
        {
            "title": "Certificate Course in Basic Python",
            "category": "Python",
            "description": "A comprehensive course to build your Python skills from scratch.",
            "price": "Free",
            "image": "https://lms.codevocado.in/static/media/python.2d3934290251c46de959.png"
        },
        {
            "title": "Advanced Program in Cyber Security",
            "category": "Cyber Security",
            "description": "Deep dive into advanced concepts in Cyber Security and threat management.",
            "price": "₹4590",
            "image": "https://lms.codevocado.in/static/media/cyber-security.9010a2f3747293234a2c.png"
        },
        {
            "title": "Certificate Course in Linux Server Administration",
            "category": "Linux",
            "description": "Gain expertise in Linux server management and administration.",
            "price": "₹850",
            "image": "https://lms.codevocado.in/static/media/linux.b9373f3f3b6b6b6b6b6b.png"
        },
        {
            "title": "Certificate Course in Cyber Security",
            "category": "Cyber Security",
            "description": "Understand the principles of Cyber Security and how to implement them effectively.",
            "price": "₹1550",
            "image": "https://lms.codevocado.in/static/media/cyber-security.9010a2f3747293234a2c.png"
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="bg-gray-100">
                {/* Hero Section */}
                <div className="relative bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-20">
                            <div className="max-w-xl">
                                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                                    Learn with Us
                                </h1>
                                <p className="text-xl text-gray-600 mb-8">
                                    Discover your potential with our expert-curated courses.
                                </p>
                                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
                                    Explore Courses
                                </button>
                            </div>
                            <div className="hidden lg:block">
                                <img src="https://lms.codevocado.in/static/media/header.b6b686e72d983bb6c9dc.webp" alt="Learn with Us" className="w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses Section */}
                <div className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h2>
                            <p className="text-lg text-gray-600">
                                Browse our wide range of free courses and start learning today!
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.map((course, index) => (
                                <CourseCard key={index} course={course} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
