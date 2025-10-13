import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-3">
                        <div className="flex flex-wrap gap-6">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                Refund Policy
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                Contact Us
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                Terms & Conditions
                            </a>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <p className="text-gray-300 text-sm">
                            © 2024 Codevocado. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
