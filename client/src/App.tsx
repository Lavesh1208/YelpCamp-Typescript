import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./scenes/Home";
import AllCampgrounds from "./scenes/AllCampgrounds";
import SingleCamp from "./scenes/SingleCamp";
import Layout from "./scenes/Layout";

function App() {
  return (
    <div className="relative app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/campgrounds" element={<AllCampgrounds />} />
            <Route path="/campgrounds/:id" element={<SingleCamp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
