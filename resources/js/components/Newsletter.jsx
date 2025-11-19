import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send this to your backend
        console.log('Subscribed with email:', email);
        alert('Thank you for subscribing to our newsletter!');
        setEmail('');
    };

    return (
        <section className="py-16 bg-blue-600">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Subscribe to our newsletter to receive updates on new courses and special offers.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="flex-grow px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors whitespace-nowrap"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;