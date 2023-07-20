import React from "react";

interface StarRatingProps {
  rating: number;
}

const StarRatingStatic: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={index <= rating ? "#ffbf00" : "gray"}
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M10 1l2.928 6.472 6.472.856-4.715 4.58 1.11 6.468L10 16.742l-5.795 3.634 1.11-6.468L.6 8.328l6.472-.856L10 1z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRatingStatic;
