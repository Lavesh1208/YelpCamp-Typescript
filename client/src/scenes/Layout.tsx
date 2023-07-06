import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
