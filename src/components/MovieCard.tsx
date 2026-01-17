import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const rating = movie.vote_average.toFixed(1);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative rounded-xl overflow-hidden no-underline text-white transition-all duration-300 bg-white/5 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl group"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="text-left mt-2">
        <h3 className="text-md md:text-lg font-semibold line-clamp-1  text-white">
          {movie.title}
        </h3>
        <div className="flex gap-2">
          <span className="text-yellow-400 md:text-[16px]">★</span>
          <span className="text-neutral-400 font-normal md:text-[16px]">
            {rating} / 10
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FavoriteCard({ movie }: MovieCardProps) {
  const rating = movie.vote_average.toFixed(1);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isLiked = movie ? isFavorite(movie) : false;

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!movie) return;
    toggleFavorite(movie);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="
                  relative flex flex-wrap group
                  md:flex-nowrap
                  gap-4 md:gap-6 m-4 p-4
                  rounded-xl overflow-hidden
                  bg-white/5
                  no-underline
                  transition-all duration-300
                  hover:-translate-y-2 hover:scale-[1.02]
                "
    >
      <div className="relative w-1/3 md:w-[182px] shrink-0 overflow-hidden rounded-xl">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="contents md:flex md:flex-col md:flex-1">
        <div className="flex-1 min-w-0 text-left gap-2 flex flex-col justify-center py-2">
          <h3 className="text-md md:text-2xl font-semibold text-white">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 my-1">
            <span className="text-yellow-400">★</span>
            <span className="text-neutral-400 text-sm">{rating} / 10</span>
          </div>
          <div className="line-clamp-2 text-neutral-400 text-xs md:text-base">
            {movie.overview}
          </div>
        </div>

        <div className="w-full md:w-auto flex items-center gap-3 mt-2 md:mt-4 order-last md:order-none">
          <button className="bg-primary-300 cursor-pointer h-11 rounded-full hover:bg-red-700 text-white px-6 flex font-semibold items-center gap-3 justify-center transition-colors flex-1 md:flex-none md:w-48">
            Watch Trailer
            <div className="bg-white p-0.5 rounded-full w-4 h-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#961200">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>

          <button
            onClick={handleFavorite}
            className="md:hidden flex cursor-pointer items-center shrink-0 justify-center h-11 w-11 rounded-full bg-[#0A0D1299] border border-neutral-800"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </button>
        </div>
      </div>
      <button
        onClick={handleFavorite}
        className="hidden cursor-pointer md:flex absolute top-2 right-2 z-20 items-center justify-center h-9 w-9 rounded-full bg-[#0A0D1299] border border-neutral-700 backdrop-blur-md"
      >
        <Heart
          className={`w-4 h-4 ${
            isLiked ? "fill-red-500 text-red-500" : "text-white"
          }`}
        />
      </button>
    </Link>
  );
}
