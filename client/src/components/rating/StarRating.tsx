import { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    if (onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div className={`flex h-10`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={index <= (hoverRating || rating) ? "#ffbf00" : "gray"}
          className="w-10 h-10 cursor-pointer"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
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

export default StarRating;
