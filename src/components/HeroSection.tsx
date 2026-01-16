import type { Movie } from "../types/movie";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  return (
    <section className="relative md:h-[100vh] w-full">
      <div className="absolute inset-0 top-0 h-[392px] md:h-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
      <div className="relative text-left md:w-[635px] md:ml-30 md:pl-0 pt-56 md:pt-[50vh] z-10 container mx-auto px-4 h-full flex flex-col pb-20">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-5xl font-bold text-white">
            {movie.title}
          </h1>
          <div className="h-[140px] overflow-y-hidden">
            <p className="text-neutral-400 text-[14px] md:text-[16px] max-w-2xl mb-8 mt-2 md:line-clamp-3">
              {movie.overview}
            </p>
          </div>
        </div>
        <div className="flex gap-4 mt-6 flex-col md:flex-row md:-mt-5">
          <button className="bg-primary-300 cursor-pointer md:text-[16px] h-11 md:h-13 rounded-full hover:bg-red-700 text-white px-8 py-3 flex  font-semibold items-center gap-3 justify-center transition-colors">
            Watch Trailer
            <div className="bg-white p-0.5 rounded-full w-4 md:w-5 md:h-5 h-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#961200"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
          <Link
            to={`/movie/${movie.id}`}
            className="md:text-[16px] cursor-pointer md:w-[230px] bg-[#0A0D12]/60 hover:bg-gray-700 border-neutral-900 border rounded-full text-white justify-center flex px-8 py-3 rounded font-semibold transition-colors backdrop-blur-sm"
          >
            See Detail
          </Link>
        </div>
      </div>
    </section>
  );
}
