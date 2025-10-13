import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function EventsIndex({ events }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Events" />

            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-orange-500">Upcoming Events</h1>
                        <Link
                            href={route('dashboard')}
                            className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700"
                        >
                            Home
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
                            >
                                <div className="p-6">
                                    <div className="mb-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                                            {formatDate(event.date)}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {event.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 leading-relaxed">
                                        {event.description}
                                    </p>
                                    
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <button className="w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {events.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No events scheduled</h3>
                            <p className="text-gray-600">Check back later for upcoming events!</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
