import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-7xl mx-auto relative">
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
