import ReviewForm from "@/components/ReviewForm";
import { ICampAndReview } from "@/interfaces/campground.interface";
import {
  useDeleteCampMutation,
  useGetSingleCampQuery,
} from "@/state/campgroundApi";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Heart,
  MessageCircle,
  Trash,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const SingleCamp = () => {
  const [deleteCamp] = useDeleteCampMutation();
  const { id: _id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { data: campground } = useGetSingleCampQuery(_id || "");

  if (!campground || !_id) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    image,
    price,
    location,
    reviews,
  }: ICampAndReview = campground;

  const handleEditButton = (target: string) => {
    navigate(`/campgrounds/${_id}/${target}`, { state: { data: campground } });
  };

  const handleDeleteButton = () => {
    deleteCamp(_id);
    navigate("/campgrounds");
  };

  return (
    <div className="mx-auto max-w-7xl px-2 py-6 lg:px-0">
      <div className="flex gap-5 max-h-[88vh]">
        <div className="w-[50%] flex-col">
          <div className="relative shrink-0 overflow-hidden rounded-md border md:mb-3">
            <div className="relative flex items-center justify-center">
              <img
                alt="Product gallery 1"
                src={image}
                className="rounded-lg object-cover w-full"
              />
            </div>
            <div className="absolute top-2/4 z-10 flex w-full items-center justify-between">
              <ChevronLeft className="text-white" />
              <ChevronRight className="text-white" />
            </div>
          </div>

          <div className="shrink-0 min-h-fit space-y-4 flex-col justify-between">
            <h2 className="text-xl font-bold md:text-2xl xl:text-3xl">
              {title}
            </h2>

            <div className="flex items-center gap-2">
              <p className="text-lg font-bold">Price: </p>
              <p className="">${price}</p>
            </div>

            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold">Location:</h4>
              <div className="flex gap-1">
                <p>{location}</p>
              </div>
            </div>

            <div className="">
              <h3 className="text-lg font-bold">Description:</h3>
              <p className="text-ellipsis overflow-hidden max-h-40">
                {description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => handleEditButton("edit")}
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
              >
                <Edit size={16} className="mr-3" />
                <span className="block">Edit</span>
              </button>
              <button
                onClick={handleDeleteButton}
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
              >
                <Trash size={16} className="mr-3" />
                <span className="block">Delete</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
              >
                <Heart size={16} className="mr-3" />
                <span className="block">Like</span>
              </button>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
              >
                <MessageCircle size={16} className="mr-3" />
                <span className="block">Review</span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-[50%] flex flex-col gap-5">
          <div className="">
            <ReviewForm _id={_id} />
          </div>
          <div className="space-y-3 h-full overflow-y-scroll">
            {reviews?.map((review) => (
              <div className="border-2 p-4" key={review._id}>
                <div className="flex gap-3 text-xl font-bold">
                  <h1>Rating:</h1>
                  <p>{review.rating}</p>
                </div>
                <div className="flex gap-3 text-lg font-semibold">
                  <h1>Review:</h1>
                  <p>{review.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCamp;
