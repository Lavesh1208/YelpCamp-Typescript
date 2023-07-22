import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { IReview } from "../interfaces/review.interface";
import { useDeleteReviewMutation } from "@/state/reviewApi";
import { useGetSingleCampQuery } from "@/state/campgroundApi";
import { useEffect } from "react";
import { IUser } from "@/interfaces/user.interface";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import StarRatingStatic from "./rating/StarRatingStatic";

interface ReviewProps {
  review: IReview;
  campgroundId: string;
}
const Review: React.FC<ReviewProps> = ({ review, campgroundId }) => {
  const [deleteReview, { isSuccess, error }] = useDeleteReviewMutation();
  const { refetch: refetchCampground } = useGetSingleCampQuery(
    campgroundId || ""
  );

  //   @ts-ignore
  const { user, isUser }: { isUser: boolean; user: IUser } = useSelector(
    (state: RootState) => state.global
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
    <div
      className="relative bg-white shadow-lg rounded-lg py-4"
      key={review._id}
    >
      <h3 className="text-xl font-semibold">{review.author.name}</h3>
      <p className="text-gray-600 mt-2">{review.body}</p>
      <div className="flex items-center mt-4">
        <span className="text-yellow-500 mr-1">&#9733;</span>
        <span className="text-gray-700">{review.rating}</span>
      </div>

      {isUser && user._id === review.author._id && (
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
      )}
    </div>
  );
};

export default Review;
