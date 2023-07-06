import { X, ChevronRight } from "lucide-react";

interface Item {
  name: string;
  href: string;
}

interface MobileNavProps {
  menuItems: Item[];
  toggleMenu: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ menuItems, toggleMenu }) => {
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
                <a
                  key={item.name}
                  href={item.href}
                  className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                >
                  <span className="ml-3 text-base font-medium text-gray-900">
                    {item.name}
                  </span>
                  <span>
                    <ChevronRight className="ml-3 h-4 w-4" />
                  </span>
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-2 space-y-2">
            <button
              type="button"
              className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Sign In
            </button>
            <button
              type="button"
              className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
