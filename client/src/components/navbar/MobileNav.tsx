import { setUser } from "@/state/global";
import { RootState } from "@/state/store";
import { useLogoutUserMutation } from "@/state/userApi";
import { X, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

interface Item {
	name: string;
	href: string;
}

interface MobileNavProps {
	menuItems: Item[];
	toggleMenu: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ menuItems, toggleMenu }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//   const { data: user } = useGetUserQuery();
	const [logoutUser] = useLogoutUserMutation();

	//   @ts-ignore
	const { isUser }: { isUser: boolean } = useSelector(
		(state: RootState) => state.global
	);

	const logoutHandler = async () => {
		await logoutUser();
		dispatch(setUser(false));
		toast.success("Logged Out");
	};

	return (
		<div className="absolute inset-x-0 top-0 z-50 origin-top-right transform transition lg:hidden">
			<div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
				<div className="px-5 pb-6 pt-5">
					<div className="flex items-center justify-between">
						<div className="inline-flex items-center space-x-2">
							<a href="/">
								<img className="w-40" src="/images/Logo.svg" alt="logo" />
							</a>
						</div>
						<div className="-mr-2">
							<button
								type="button"
								onClick={toggleMenu}
								className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
							>
								<span className="sr-only">Close menu</span>
								<X className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
					</div>
					<div className="mt-6">
						<nav className="grid gap-y-4">
							{menuItems.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
								>
									<span className="ml-3 text-base font-medium text-gray-900">
										{item.name}
									</span>
									<span>
										<ChevronRight className="ml-3 h-4 w-4" />
									</span>
								</Link>
							))}
						</nav>
					</div>
					<div className="w-full ml-2 mt-4 space-y-2">
						{isUser ? (
							<button
								onClick={logoutHandler}
								type="button"
								className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm"
							>
								Logout
							</button>
						) : (
							<div>
								<button
									onClick={() => navigate("/register")}
									type="button"
									className="w-full rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10"
								>
									Sign In
								</button>
								<button
									onClick={() => navigate("/login")}
									type="button"
									className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm"
								>
									Log In
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileNav;
