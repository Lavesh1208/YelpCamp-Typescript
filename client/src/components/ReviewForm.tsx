import { useEffect } from "react";
import toast from "react-hot-toast";
import { IReview } from "@/interfaces/review.interface";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useCreateReviewMutation } from "@/state/reviewApi";
import { useNavigate } from "react-router-dom";
import { useGetSingleCampQuery } from "@/state/campgroundApi";
import StarRating from "./rating/StarRating";

const ReviewForm = ({ _id }: { _id: string }) => {
  const navigate = useNavigate();
  const { refetch: refetchCampground } = useGetSingleCampQuery(_id || "");
  const [addReview, { isSuccess, data, error }] = useCreateReviewMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IReview>();

  const onSubmit: SubmitHandler<IReview> = async (values) => {
    const review = {
      review: {
        ...values,
        rating: parseFloat(values.rating as unknown as string),
      },
    };

    await addReview({ _id, review });
  };

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Review Added");
      refetchCampground();
      navigate(window.location.pathname);
    } else if (error) {
      if ("data" in error) {
        toast.error(error.data as string);
      } else {
        toast.error("An error occurred.");
        console.log(error);
      }
    }
  }, [data, error, isSuccess, _id, navigate, refetchCampground]);

  return (
    <div className="relative">
      <div className="font-bold text-3xl mb-1.5">Leave a Review</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2.5 mt-1">
          <Controller
            name="rating"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <StarRating
                rating={field.value}
                onRatingChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="mb-2 space-y-1">
          <label className="text-xl font-bold" htmlFor="rating">
            Review
          </label>
          <textarea
            className="w-full rounded-md border border-black/30 bg-[#F9F6F1] outline-none px-3 py-3.5 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/80"
            id="review"
            rows={5}
            cols={5}
            placeholder="Write a Review"
            {...register("body", {
              required: "Review is required",
            })}
          />
        </div>
        <p className="text-red-600 text-sm">{errors.body?.message}</p>
        <button
          type="submit"
          className="absolute bottom-5 right-5 mt-4 text-sm rounded-md bg-black px-5 py-3 font-semibold text-white shadow-sm hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
