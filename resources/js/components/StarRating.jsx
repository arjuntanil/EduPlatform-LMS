import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

export default function StarRating({ rating, onRatingChange, editable = false, size = 'sm' }) {
    const sizeClasses = {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
        xl: 'h-8 w-8'
    };

    const handleStarClick = (starRating) => {
        if (editable && onRatingChange) {
            onRatingChange(starRating);
        }
    };

    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= rating;
                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        disabled={!editable}
                        className={`${
                            editable 
                                ? 'cursor-pointer hover:scale-110 transition-transform' 
                                : 'cursor-default'
                        } ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                        {isFilled ? (
                            <StarIcon className={sizeClasses[size]} />
                        ) : (
                            <StarOutlineIcon className={sizeClasses[size]} />
                        )}
                    </button>
                );
            })}
        </div>
    );
}