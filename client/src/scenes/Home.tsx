import { CheckCircle } from "lucide-react";

const Home = () => {
  return (
    <div className="relative w-screen h-full overflow-hidden bg-[#F9F6F1]">
      <div className="block md:absolute w-44 top-10 left-20">
        <img className="w-full" src="/images/Logo.svg" alt="" />
      </div>
      <div className="w-full h-full flex">
        <div className="flex flex-col justify-center w-[45%] h-full gap-5 lg:px-20">
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
            type="button"
            className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 max-w-fit"
          >
            Visit Campgrounds Page
          </button>
          <form action="" className="mt-4 flex items-start space-x-2">
            <div>
              <input
                className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Enter your email"
                id="email"
              ></input>
              <p className="mt-3 text-sm text-gray-500">
                We care about your privacy
              </p>
            </div>
            <div>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Subscribe
              </button>
            </div>
          </form>
          <div className="mt-2 flex max-w-max items-center space-x-2 rounded-full bg-gray-200 pl-1 pr-3.5 py-1">
            <div className="rounded-full bg-[#F9F6F1] py-1 px-3.5">
              <p className="text-sm font-semibold">View Code</p>
            </div>
            <p className="text-sm font-semibold">
              Join our team and contribute &rarr;
            </p>
          </div>
        </div>
        <div className="w-[55%]">
          <img
            className="h-full aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] xl:aspect-[16/9]"
            src="https://images.unsplash.com/photo-1545943322-e349aefd8725?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
