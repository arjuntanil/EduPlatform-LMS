import React from 'react';

const Mentor = () => {
    const mentors = [
        {
            id: 1,
            name: 'John Doe',
            role: 'Senior Software Engineer',
            company: 'Tech Corp',
            experience: '10+ years',
            image: '/images/mentor/user1.png'
        },
        {
            id: 2,
            name: 'Jane Smith',
            role: 'Product Manager',
            company: 'Innovate Inc',
            experience: '8+ years',
            image: '/images/mentor/user2.png'
        },
        {
            id: 3,
            name: 'Robert Johnson',
            role: 'Data Scientist',
            company: 'Data Insights',
            experience: '12+ years',
            image: '/images/mentor/user3.png'
        }
    ];

    return (
        <section id="mentor" className="py-16 bg-gray-50">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expert Mentors</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Learn from industry experts with years of practical experience
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mentors.map((mentor) => (
                        <div key={mentor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <img 
                                        src={mentor.image} 
                                        alt={mentor.name} 
                                        className="w-16 h-16 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                                        <p className="text-gray-600">{mentor.role}</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-gray-700 mb-2"><span className="font-semibold">Company:</span> {mentor.company}</p>
                                    <p className="text-gray-700"><span className="font-semibold">Experience:</span> {mentor.experience}</p>
                                </div>
                                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Mentor;