import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function FacultyIndex({ faculties }) {
    return (
        <AuthenticatedLayout>
            <Head title="Faculty" />

            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Meet Our Vibrant Faculty</h1>
                        <Link
                            href={route('dashboard')}
                            className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700"
                        >
                            Home
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {faculties.map((f) => (
                            <div
                                key={f.id}
                                className="group relative overflow-hidden rounded-2xl p-6 text-gray-900 transition-colors duration-300"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,192,203,0.5) 0%, rgba(173,216,230,0.5) 100%)',
                                }}
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                     style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)' }}></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={f.image_url || '/images/faculty/default-profile.png'}
                                            alt={f.name}
                                            className="h-16 w-16 rounded-full object-cover border-2 border-white shadow"
                                        />
                                        <div>
                                            <h3 className="text-xl font-bold group-hover:text-white transition-colors">{f.name}</h3>
                                            <p className="text-sm text-gray-700 group-hover:text-white/90 transition-colors">{f.role}</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 group-hover:text-white/90 transition-colors flex-1">{f.description}</p>

                                    <div className="mt-6 flex items-center justify-between">
                                        <a
                                            href={`mailto:${f.email}`}
                                            className="inline-flex items-center px-4 py-2 rounded-md bg-white/90 text-gray-900 font-semibold hover:bg-white group-hover:bg-white transition-colors"
                                        >
                                            Contact
                                        </a>
                                        <span className="text-sm group-hover:text-white/90 transition-colors">{f.email}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}



