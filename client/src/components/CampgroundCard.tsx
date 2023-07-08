import { ICampground } from "@/interfaces/campground.interface";
import { ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface CampgroundCardProps {
  campground: ICampground;
}

const CampgroundCard: React.FC<CampgroundCardProps> = ({ campground }) => {
  const { _id, title, description } = campground;
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/campgrounds/${_id}`);
  };
  return (
    <div className="rounded-md border">
      <img
        src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        alt="Laptop"
        className="h-60 w-full rounded-t-md object-cover"
      />
      <div className="p-4">
        <Link
          to={`/campgrounds/${_id}`}
          className="inline-flex items-center text-lg font-semibold"
        >
          {title} &nbsp; <ArrowUpRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-sm text-gray-600 text-ellipsis overflow-hidden h-20">
          {description}
        </p>
        <button
          onClick={onClickHandler}
          type="button"
          className="mt-4 w-full rounded-md bg-black px-2 py-2 font-semibold text-white shadow-sm hover:bg-black/80"
        >
          View Campground
        </button>
      </div>
    </div>
  );
};

export default CampgroundCard;
