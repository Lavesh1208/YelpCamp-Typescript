import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./scenes/Home";
import AllCampgrounds from "./scenes/AllCampgrounds";
import SingleCamp from "./scenes/SingleCamp";
import Layout from "./scenes/Layout";
import CreateCamp from "./scenes/CreateCamp";
import UpdateCamp from "./scenes/UpdateCamp";
import Register from "./scenes/Register";
import Login from "./scenes/Login";
import { useEffect, useState } from "react";
import { setUser } from "./state/global";
import { useDispatch } from "react-redux";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserFromCookie = () => {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const decodedCookie = decodeURIComponent(userCookie);
        const userString = decodedCookie.substring(2);
        const user = JSON.parse(userString);
        setLoggedInUser(user);
        dispatch(setUser({ isUser: true, user: { ...user } }));
      } else {
        setLoggedInUser(null);
      }
    };

    getUserFromCookie();
  }, [dispatch]);

  return (
    <div className="relative app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/campgrounds" element={<AllCampgrounds />} />
            <Route path="/campgrounds/:id" element={<SingleCamp />} />
            <Route path="/campgrounds/new" element={<CreateCamp />} />
            <Route path="/campgrounds/:id/edit" element={<UpdateCamp />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
