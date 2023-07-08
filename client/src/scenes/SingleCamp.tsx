import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Heart,
  MessageCircle,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SingleCamp = () => {
  const navigate = useNavigate();
  const onClickHandler = (target: string) => {
    navigate(`/campgrounds/someId/${target}`);
  };
  return (
    <div className="mx-auto max-w-7xl px-2 py-6 lg:px-0">
      <div className="overflow-hidden">
        <div className="mb-9 pt-4 md:px-6 md:pt-7 lg:mb-2">
          <div className="flex-col">
            <div className="relative shrink-0 overflow-hidden rounded-md border md:mb-3">
              <div className="relative flex items-center justify-center">
                <img
                  alt="Product gallery 1"
                  src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  className="rounded-lg object-cover w-full h-[700px]"
                />
              </div>
              <div className="absolute top-2/4 z-10 flex w-full items-center justify-between">
                <ChevronLeft className="text-white" />
                <ChevronRight className="text-white" />
              </div>
            </div>

            <div className="shrink-0 min-h-fit space-y-4 flex-col justify-between">
              <h2 className="text-xl font-bold md:text-2xl xl:text-3xl">
                Campground Title
              </h2>

              <div className="flex items-center gap-2">
                <p className="text-lg font-bold">Price: </p>
                <p className="">$250</p>
              </div>

              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold">Location:</h4>
                <div className="flex gap-1">
                  <p>City,</p>
                  <p>State</p>
                </div>
              </div>

              <div className="">
                <h3 className="text-lg font-bold">Description:</h3>
                <p className="text-ellipsis overflow-hidden max-h-40">
                  A chip (often just chip, or crisp in British and Irish
                  English) may be a thin slice of potato that has been either
                  deep fried or baked until crunchy. theyre commonly served as a
                  snack, side dish, or appetizer. A chip (often just chip, or
                  crisp in British and Irish English) may be a thin slice of
                  potato that has been either deep fried or baked until crunchy.
                  theyre commonly served as a snack, side dish, or appetizer. A
                  chip (often just chip, or crisp in British and Irish English)
                  may be a thin slice of potato that has been either deep fried
                  or baked until crunchy. theyre commonly served as a snack,
                  side dish, or appetizer.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => onClickHandler("edit")}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
                >
                  <Edit size={16} className="mr-3" />
                  <span className="block">Edit</span>
                </button>
                <button
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
                  <span className="block">Comment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCamp;
