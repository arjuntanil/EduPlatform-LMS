import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from '@inertiajs/react';

const Courses = ({ courses = [] }) => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: false,
        autoplay: true,
        speed: 500,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

        return (
            <>
                {Array(fullStars).fill(0).map((_, i) => (
                    <svg key={`full-${i}`} className="text-yellow-500 text-xl inline-block" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                ))}
                {halfStars > 0 && (
                    <svg className="text-yellow-500 text-xl inline-block" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24zM12 15.4V6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z"/>
                    </svg>
                )}
                {Array(emptyStars).fill(0).map((_, i) => (
                    <svg key={`empty-${i}`} className="text-gray-400 text-xl inline-block" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                ))}
            </>
        );
    };

    return (
        <section id="courses">
            <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4'>
                <div className="sm:flex justify-between items-center mb-20">
                    <h2 className="text-midnight_text text-4xl lg:text-5xl font-semibold mb-5 sm:mb-0">Popular courses.</h2>
                    <Link href="/courses" className="text-primary text-lg font-medium hover:tracking-widest duration-500">Explore courses&nbsp;&gt;&nbsp;</Link>
                </div>
                {courses.length > 0 ? (
                    <Slider {...settings}>
                        {courses.map((items, i) => (
                            <div key={i}>
                                <div className='bg-white m-3 mb-12 px-3 pt-3 pb-12 shadow-course-shadow rounded-2xl h-full'>
                                    <div className="relative rounded-3xl">
                                        <img src={items.image || '/images/courses/default.png'} alt="course-image" width={389} height={262} className="m-auto clipPath w-full" />
                                        <div className="absolute right-5 -bottom-2 bg-secondary rounded-full p-6">
                                            <h3 className="text-white uppercase text-center text-sm font-medium">best <br /> seller</h3>
                                        </div>
                                    </div>

                                    <div className="px-3 pt-6">
                                        <Link href={`/courses/${items.id}`} className='text-2xl font-bold text-black max-w-75% inline-block'>{items.title}</Link>
                                        <h3 className='text-base font-normal pt-6 text-black/75'>{items.instructor}</h3>
                                        <div className="flex justify-between items-center py-6 border-b">
                                            <div className="flex items-center gap-4">
                                                <h3 className="text-red-700 text-2xl font-medium">{items.rating.toFixed(1)}</h3>
                                                <div className="flex">
                                                    {renderStars(items.rating)}
                                                </div>
                                            </div>
                                            <h3 className="text-3xl font-medium">${items.price}</h3>
                                        </div>
                                        <div className="flex justify-between pt-6">
                                            <div className="flex gap-4">
                                                <svg className="text-primary text-xl inline-block me-2" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 6h14M5 10h14M5 14h14M5 18h14"/>
                                                </svg>
                                                <h3 className="text-base font-medium text-black opacity-75">{items.classes} classes</h3>
                                            </div>
                                            <div className="flex gap-4">
                                                <svg className="text-primary text-xl inline-block me-2" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm-7 10a7 7 0 1 1 14 0"/>
                                                </svg>
                                                <h3 className="text-base font-medium text-black opacity-75">{items.students} students</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No courses available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Courses;
