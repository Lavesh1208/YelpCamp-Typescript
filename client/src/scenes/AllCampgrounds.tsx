import CampgroundCard from "@/components/CampgroundCard";
import { ICampground } from "@/interfaces/campground.interface";
import { useGetCampgroundsQuery } from "@/state/campgroundApi";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const AllCampgrounds = () => {
  const { data: campgrounds } = useGetCampgroundsQuery();
  return (
    <div className="w-full px-8 py-8">
      <div className="bg-[#F9F6F1] space-y-3 p-10">
        <h1 className="text-4xl font-bold text-black">Welcome to YelpCamp!</h1>
        <p>
          View our hand-picked campgrounds from all over the world, or add your
          own.
        </p>
        <form className="mt-4 flex items-start space-x-2">
          <div className="flex gap-2 max-w-fit rounded-md border border-black/30 bg-white px-5 py-3.5 placeholder:text-gray-600">
            <Search />
            <input
              className="focus:outline-none"
              type="text"
              placeholder="Search for location"
            ></input>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-black px-5 py-3.5 font-semibold text-white shadow-sm hover:bg-black/80"
            >
              Search
            </button>
          </div>
        </form>
        <div className="hover:underline underline-offset-2">
          <Link to="/campgrounds/new">Or add your own campgrounds</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10 gap-10">
        {campgrounds &&
          campgrounds.map((campground: ICampground) => (
            <div key={campground._id}>
              <CampgroundCard campground={campground} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllCampgrounds;
