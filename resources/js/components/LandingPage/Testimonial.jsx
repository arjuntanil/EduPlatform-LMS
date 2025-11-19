import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = ({ testimonials = [] }) => {
    const defaultTestimonials = [
        {
            name: "Robert Fox",
            profession: 'CEO, Parkview Int.Ltd',
            comment: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
            imgSrc: '/images/testimonial/user.svg',
            rating: 5
        },
        {
            name: "Leslie Alexander",
            profession: 'CEO, Parkview Int.Ltd',
            comment: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
            imgSrc: '/images/mentor/user2.png',
            rating: 5
        },
        {
            name: "Cody Fisher",
            profession: 'CEO, Parkview Int.Ltd',
            comment: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
            imgSrc: '/images/mentor/user3.png',
            rating: 5
        },
    ];

    const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

    const settings = {
        dots: true,
        dotsClass: "slick-dots",
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: false,
        autoplay: true,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 800,
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
        <section id="testimonial">
            <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4'>
                <Slider {...settings}>
                    {displayTestimonials.map((items, i) => (
                        <div key={i}>
                            <div className={`bg-white rounded-2xl m-4 p-5 my-20 relative ${i % 2 ? 'shadow-testimonial-shadow2' : 'shadow-testimonial-shadow1'}`}>
                                <div className="absolute top-[-45px]">
                                    <img src={items.imgSrc}
                                        alt={items.name} width={100} height={100} className="inline-block rounded-full" />
                                </div>
                                <h4 className='text-base font-normal text-darkgray my-4'>{items.comment}</h4>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className='text-lg font-medium text-darkbrown pt-4 pb-2'>{items.name}</h3>
                                        <h3 className='text-sm font-normal text-lightgray pb-2'>{items.profession}</h3>
                                    </div>
                                    <div className="flex">
                                        {renderStars(items.rating)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Testimonial;
