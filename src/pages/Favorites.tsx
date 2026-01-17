import { FavoriteCard } from "../components/MovieCard";
import { MovieGridFavorite } from "../components/MovieGrid";
import { useFavorites } from "../context/FavoritesContext";
import notFoundImg from "../assets/Frame 52.svg";
import { Link } from "react-router-dom";

export function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="mt-16 py-2 flex flex-col gap-4">
      <h1 className="font-bold text-2xl text-left px-4">Favorites</h1>
      {favorites.length === 0 ? (
        <div className="relative flex flex-col gap-6 items-center justify-center h-screen  ">
          <div className="flex flex-col gap-3 items-center justify-center text-center">
            <img
              src={notFoundImg}
              alt="Ilustration not found img"
              className="grayscale-100"
            />
            <h2 className="font-semibold">Data Empty</h2>
            <p className="text-neutral-400 text-sm">
              You don't have a favorite movie yet
            </p>
          </div>
          <Link
            to="/"
            className="w-[200px] h-11 bg-primary-300 rounded-full flex items-center justify-center font-semibold text-sm"
          >
            Explore Movie
          </Link>
        </div>
      ) : (
        <MovieGridFavorite movies={favorites} />
      )}
    </div>
  );
}
