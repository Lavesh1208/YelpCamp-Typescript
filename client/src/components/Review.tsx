import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { IReview } from "../interfaces/review.interface";
import { useDeleteReviewMutation } from "@/state/reviewApi";
import { useGetSingleCampQuery } from "@/state/campgroundApi";
import { useEffect } from "react";

interface ReviewProps {
  review: IReview;
  campgroundId: string;
}
const Review: React.FC<ReviewProps> = ({ review, campgroundId }) => {
  const [deleteReview, { isSuccess, error }] = useDeleteReviewMutation();
  const { refetch: refetchCampground } = useGetSingleCampQuery(
    campgroundId || ""
  );

  const handleDeleteButton = async () => {
    await deleteReview({ _id: campgroundId, reviewId: review._id });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Review Deleted");
      refetchCampground();
    } else if (error) {
      if ("data" in error) {
        toast.error(error.data as string);
      } else {
        toast.error("An error occurred.");
        console.log(error);
      }
    }
  }, [isSuccess, error, refetchCampground]);

  return (
    <div className="relative h-40 border-2 p-4" key={review._id}>
      <div className="flex gap-3 text-xl font-bold">
        <h1>Rating:</h1>
        <p>{review.rating}</p>
      </div>
      <div className="flex gap-3 text-lg font-semibold">
        <h1>Review:</h1>
        <p>{review.body}</p>
      </div>
      <div className="absolute bottom-2 right-2">
        <button
          onClick={handleDeleteButton}
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-600 transition-all"
        >
          <Trash size={16} className="mr-1" />
          <span className="block">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default Review;
