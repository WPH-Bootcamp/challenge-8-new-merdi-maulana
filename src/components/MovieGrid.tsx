import type { Movie } from "../types/movie";
import { MovieCard, FavoriteCard } from "./MovieCard";

interface MovieGridProps {
  movies?: Movie[];
}

export function MovieGrid({ movies = [] }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 md:gap-y-10">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export function MovieGridFavorite({ movies = [] }: MovieGridProps) {
  return (
    <div className="grid gap-4 md:gap-5 md:mt-[154px] md:mx-30">
      {movies.map((movie) => (
        <FavoriteCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
