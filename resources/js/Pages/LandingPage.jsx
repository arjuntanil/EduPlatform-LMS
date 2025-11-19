import React from 'react';
import { Head } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import Companies from '@/Components/Companies';
import Courses from '@/Components/Courses';
import Mentor from '@/Components/Mentor';
import Testimonial from '@/Components/Testimonial';
import Newsletter from '@/Components/Newsletter';
import GuestLayout from '@/Layouts/GuestLayout';

export default function LandingPage({ courses = [] }) {
    return (
        <GuestLayout>
            <Head title="eLearning - Advance Your Engineering Skills" />
            <main>
                <Hero />
                <Companies />
                <Courses courses={courses} />
                <Mentor />
                <Testimonial />
                <Newsletter />
            </main>
        </GuestLayout>
    );
}