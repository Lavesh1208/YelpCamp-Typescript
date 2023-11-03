import React, { useState } from "react";
import { Menu } from "lucide-react";
import MobileNav from "./MobileNav";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/state/userApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setUser } from "@/state/global";

const menuItems = [
	{
		name: "All Campgrounds",
		href: "/campgrounds",
	},
	{
		name: "Create Campground",
		href: "/campgrounds/new",
	},
];

interface NavbarProps {
	isUser: boolean;
	setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//   const { data: user } = useGetUserQuery();
	const [logoutUser] = useLogoutUserMutation();

	//   @ts-ignore
	const { isUser }: { isUser: boolean } = useSelector(
		(state: RootState) => state.global
	);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const logoutHandler = async () => {
		await logoutUser();
		dispatch(setUser(false));
		toast.success("Logged Out");
	};

	return (
		<div className="relative w-full bg-white shadow-lg">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
				<div className="inline-flex items-center space-x-2">
					<a href="/">
						<img className="w-48" src="/images/Logo.svg" alt="logo" />
					</a>
				</div>
				<div className="hidden grow items-start lg:flex">
					<ul className="ml-12 inline-flex space-x-8">
						{menuItems.map((item) => (
							<li key={item.name}>
								<Link
									to={item.href}
									className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="hidden space-x-2 lg:block">
					{isUser ? (
						<button
							onClick={logoutHandler}
							type="button"
							className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm"
						>
							Logout
						</button>
					) : (
						<div>
							<button
								onClick={() => navigate("/register")}
								type="button"
								className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10"
							>
								Sign In
							</button>
							<button
								onClick={() => navigate("/login")}
								type="button"
								className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm"
							>
								Log In
							</button>
						</div>
					)}
				</div>
				<div className="lg:hidden">
					<Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
				</div>
				{isMenuOpen && (
					<MobileNav toggleMenu={toggleMenu} menuItems={menuItems} />
				)}
			</div>
		</div>
	);
};

export default Navbar;
