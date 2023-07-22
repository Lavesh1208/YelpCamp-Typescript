import { ICampground } from "@/interfaces/campground.interface";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface CampgroundCardProps {
  campground: ICampground;
}

const CampgroundCard: React.FC<CampgroundCardProps> = ({ campground }) => {
  const { _id, title, description, images } = campground;
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/campgrounds/${_id}`);
  };

  useEffect(() => {
    if (!images[0]) {
      return;
    }
  }, [images]);

  return (
    <div className="rounded-md border">
      <img
        src={images[0]?.url}
        alt="Campground Image"
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
