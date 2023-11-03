import { IReview } from "@/interfaces/review.interface";
import React from "react";

interface ReviewProps {
	review: IReview;
	campgroundId: string;
}

const ReviewSection: React.FC<ReviewProps> = ({ review }) => {
	return (
		<>
			<div key={review._id} className="bg-white p-6 shadow rounded-lg">
				<h3 className="text-xl font-semibold">{review.author.name}</h3>
				<p className="text-gray-600 mt-2">{review.body}</p>
				<div className="flex items-center mt-4">
					<span className="text-yellow-500 mr-1">&#9733;</span>
					<span className="text-gray-700">{review.rating}</span>
				</div>
			</div>
		</>
	);
};

export default ReviewSection;
