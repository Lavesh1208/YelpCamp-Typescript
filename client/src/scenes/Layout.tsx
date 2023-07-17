import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

const Layout = () => {
  const [isUser, setIsUser] = useState(false);
  return (
    <div className="">
      <Navbar isUser={isUser} setIsUser={setIsUser} />
      <div className="max-w-7xl mx-auto relative">
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
