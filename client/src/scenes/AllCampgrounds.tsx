import CampgroundCard from "@/components/CampgroundCard";
import { ICampground } from "@/interfaces/campground.interface";
import { useGetCampgroundsQuery } from "@/state/campgroundApi";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AllCampgrounds = () => {
	const { data: campgrounds } = useGetCampgroundsQuery();

	return (
		<div className="w-full px-8 py-8">
			<div className="bg-[#F9F6F1] space-y-3 p-10">
				<h1 className="text-4xl font-bold text-black">Welcome to YelpCamp!</h1>
				<p className="text-lg font-semibold">
					View our hand-picked campgrounds from all over the world, or add your
					own.
				</p>

				<div className="flex items-center gap-2 hover:underline underline-offset-2">
					<Link to="/campgrounds/new">Or add your own campgrounds</Link>
					<ArrowRight size={18} />
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10 gap-10">
				{campgrounds &&
					campgrounds.map((campground: ICampground) => (
						<div key={campground._id} className="flex justify-center">
							<CampgroundCard campground={campground} />
						</div>
					))}
			</div>
		</div>
	);
};

export default AllCampgrounds;
