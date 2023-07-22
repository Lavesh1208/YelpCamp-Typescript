import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/campgrounds");
  };

  return (
    <div className="relative flex flex-col lg:flex-row w-screen h-full overflow-x-hidden lg:overflow-hidden bg-[#F9F6F1] scrollbar-hide">
      <div className="block z-50 lg:absolute bg-[#F9F6F1] p-5 w-full lg:w-44 top-10 left-16">
        <img className="w-44" src="/images/Logo.svg" alt="" />
      </div>
      <div className="w-full h-full flex flex-col-reverse lg:flex-row">
        <div className="flex flex-col lg:justify-center w-full lg:w-[45%] h-full gap-5 py-20 px-10 sm:p-12 md:px-20 ">
          <h1 className="text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            Explore the best camps on Earth.
          </h1>
          <p className="text-lg text-[#5a5656]">
            YelpCamp is a curated list of the best camping spots on Earth.
            Unfiltered and unbiased reviews.
          </p>
          <ul className="text-[#5a5656] space-y-1">
            <li className="flex gap-2">
              <CheckCircle className="text-[#15A385]" />
              Add your own camp suggestions.
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-[#15A385]" />
              Leave reviews and experiences.
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-[#15A385]" />
              See locations for all camps.
            </li>
          </ul>
          <button
            onClick={onClickHandler}
            type="button"
            className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 max-w-fit"
          >
            Visit Campgrounds Page
          </button>
          <div className="mt-2 flex max-w-max items-center space-x-2 rounded-full bg-gray-200 pl-1 pr-3.5 py-1">
            <div className="rounded-full bg-[#F9F6F1] py-1 px-3.5">
              <p className="text-sm font-semibold">View Code</p>
            </div>
            <p className="text-sm font-semibold">
              Join our team and contribute &rarr;
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[55%]">
          <img
            className="w-full h-full aspect-[3/2] bg-gray-50 object-cover"
            src="https://images.unsplash.com/photo-1545943322-e349aefd8725?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
