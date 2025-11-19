import React from 'react';
import { Link } from '@inertiajs/react';

const Hero = () => {
    return (
        <section id="home-section" className="bg-gray-100">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1 items-center">
                    <div className="col-span-6 flex flex-col gap-8">
                        <div className="flex gap-2 mx-auto lg:mx-0">
                            <svg className="text-green-500 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <p className="text-green-500 text-sm font-semibold text-center lg:text-start">Get 30% off on first enroll</p>
                        </div>
                        <h1 className="text-gray-900 text-4xl sm:text-5xl font-semibold pt-5 lg:pt-0">Advance your engineering skills with us.</h1>
                        <h3 className="text-gray-700 text-lg pt-5 lg:pt-0">Build skills with our courses and mentor from world-class companies.</h3>
                        <div className="relative rounded-full pt-5 lg:pt-0">
                            <input 
                                type="text" 
                                className="py-4 lg:py-5 pl-6 pr-16 text-lg w-full text-gray-800 rounded-full focus:outline-none shadow-md" 
                                placeholder="Search courses..." 
                                autoComplete="off" 
                            />
                            <button className="bg-blue-600 p-3 rounded-full absolute right-2 top-2">
                                <svg className="text-white w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center justify-between pt-10 lg:pt-4">
                            <div className="flex gap-2">
                                <svg className="text-green-500 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm sm:text-lg font-normal text-gray-800">Flexible</p>
                            </div>
                            <div className="flex gap-2">
                                <svg className="text-green-500 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm sm:text-lg font-normal text-gray-800">Learning path</p>
                            </div>
                            <div className="flex gap-2">
                                <svg className="text-green-500 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm sm:text-lg font-normal text-gray-800">Community</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 flex justify-center">
                        <img 
                            src="/images/banner/mahila.png" 
                            alt="Learning illustration" 
                            className="w-full max-w-lg h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;