import CampgroundCard from "@/components/CampgroundCard";
import { Search } from "lucide-react";

const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
  43, 44, 45, 46, 47, 48, 49, 50,
];

const AllCampgrounds = () => {
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
          <a href="#">Or add your own campgrounds</a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10 gap-10">
        {arr.map((item) => (
          <div key={item}>
            <CampgroundCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCampgrounds;
