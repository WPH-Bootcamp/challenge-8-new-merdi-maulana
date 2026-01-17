import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import { Navbar } from "./components/Navbar";
import { Search } from "./pages/Search";
import Footer from "./components/Footer";
import { Favorites } from "./pages/Favorites";

function App() {
  return (
    <div className="bg-black min-h-screen text-white p-0 flex flex-col">
      <main className="flex-1">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
