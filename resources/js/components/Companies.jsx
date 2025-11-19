import React from 'react';

const Companies = () => {
    // Company logos
    const companies = [
        { id: 1, name: 'Google', logo: '/images/companies/google.svg' },
        { id: 2, name: 'Microsoft', logo: '/images/companies/microsoft.svg' },
        { id: 3, name: 'Airbnb', logo: '/images/companies/airbnb.svg' },
        { id: 4, name: 'FedEx', logo: '/images/companies/fedex.svg' },
        { id: 5, name: 'HubSpot', logo: '/images/companies/hubspot.svg' },
        { id: 6, name: 'Walmart', logo: '/images/companies/walmart.svg' },
    ];

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Trusted by professionals at</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                    {companies.map((company) => (
                        <div key={company.id} className="flex justify-center">
                            <img 
                                src={company.logo} 
                                alt={company.name} 
                                className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Companies;