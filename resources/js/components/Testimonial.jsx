import React from 'react';

const Testimonial = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Alex Johnson',
            role: 'Software Developer',
            content: 'This platform has completely transformed my learning experience. The courses are well-structured and the mentors are incredibly knowledgeable.',
            rating: 5,
            image: '/images/mentor/user1.png'
        },
        {
            id: 2,
            name: 'Sarah Williams',
            role: 'Product Designer',
            content: 'I\'ve tried many online learning platforms, but this one stands out for its quality of content and practical approach to teaching.',
            rating: 5,
            image: '/images/mentor/user2.png'
        },
        {
            id: 3,
            name: 'Michael Chen',
            role: 'Data Analyst',
            content: 'The hands-on projects and real-world examples helped me apply what I learned immediately in my job. Highly recommended!',
            rating: 4,
            image: '/images/mentor/user3.png'
        }
    ];

    const renderStars = (rating) => {
        return (
            <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <section id="testimonial" className="py-16 bg-white">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it - hear from our satisfied learners
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                            {renderStars(testimonial.rating)}
                            <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                            <div className="flex items-center">
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name} 
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;