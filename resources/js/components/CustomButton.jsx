import React from 'react';

export default function CustomButton({ type = 'submit', className = '', processing, children }) {
    return (
        <button
            type={type}
            className={`inline-flex items-center px-6 py-3 bg-[#2563EB] border border-transparent rounded-md font-semibold text-sm text-white tracking-wide hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                processing && 'opacity-25'
            } ${className}`}
            disabled={processing}
        >
            {children}
        </button>
    );
}