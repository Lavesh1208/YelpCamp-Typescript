import { ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CampgroundCard = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/campgrounds/someId");
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
          to="/campgrounds/someId"
          className="inline-flex items-center text-lg font-semibold"
        >
          About Campground &nbsp; <ArrowUpRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-sm text-gray-600 text-ellipsis overflow-hidden h-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          officiis nobis vel consequuntur asperiores velit quis dolorum mollitia
          rem atque modi illo et nemo voluptatem minima. Deserunt velit
          doloremque illum. Dolorum quas possimus facere molestiae saepe dolorem
          laboriosam debitis at, temporibus eligendi commodi ratione facilis
          quia ut suscipit ex sed molestias tempora iure distinctio perferendis!
          Recusandae consequatur veritatis sint ducimus.
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
