import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import FavouritesPage from "./pages/FavouritesPage";
import SingleMoviePage from "./pages/SingleMoviePage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/movie/:id" element={<SingleMoviePage />} />
      </Routes>
    </>
  );
}

export default App;
