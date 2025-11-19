import React from 'react';

const Hero = () => {
    return (
        <section id="home-section" className='bg-slateGray'>
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 pt-20">
                <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1 items-center'>
                    <div className='col-span-6 flex flex-col gap-8 '>
                        <div className='flex gap-2 mx-auto lg:mx-0'>
                            <svg className="text-success text-xl inline-block me-2" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/>
                            </svg>
                            <p className='text-success text-sm font-semibold text-center lg:text-start'>Get 30% off on first enroll</p>
                        </div>
                        <h1 className='text-midnight_text text-4xl sm:text-5xl font-semibold pt-5 lg:pt-0'>Advance your engineering skills with us.</h1>
                        <h3 className='text-black/70 text-lg pt-5 lg:pt-0'>Build skills with our courses and mentor from world-class companies.</h3>
                        <div className="relative rounded-full pt-5 lg:pt-0">
                            <input type="text" name="q" className="py-6 lg:py-8 pl-8 pr-20 text-lg w-full text-black rounded-full focus:outline-none shadow-input-shadow" placeholder="search courses..." autoComplete="off" />
                            <button className="bg-secondary p-5 rounded-full absolute right-2 top-2 ">
                                <svg className="text-white text-4xl inline-block" width="32" height="32" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314Z"/>
                                </svg>
                            </button>
                        </div>
                        <div className='flex items-center justify-between pt-10 lg:pt-4'>
                            <div className='flex gap-2'>
                                <img src="/images/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage' />
                                <p className='text-sm sm:text-lg font-normal text-black'>Flexible</p>
                            </div>
                            <div className='flex gap-2'>
                                <img src="/images/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage' />
                                <p className='text-sm sm:text-lg font-normal text-black'>Learning path</p>
                            </div>
                            <div className='flex gap-2'>
                                <img src="/images/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage' />
                                <p className='text-sm sm:text-lg font-normal text-black'>Community</p>
                            </div>
                        </div>

                    </div>
                    <div className='col-span-6 flex justify-center'>
                        <img src="/images/banner/mahila.png" alt="Learning illustration" width={1000} height={805} />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero;
