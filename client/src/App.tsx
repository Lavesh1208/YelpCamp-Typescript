import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./scenes/Home";
import AllCampgrounds from "./scenes/AllCampgrounds";
import SingleCamp from "./scenes/SingleCamp";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campgrounds" element={<AllCampgrounds />} />
          <Route path="/campgrounds/:id" element={<SingleCamp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
