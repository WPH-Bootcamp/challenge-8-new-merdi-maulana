import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieDetail, getMovieCredits } from "../lib/api";
import { useFavorites } from "../context/FavoritesContext";
import calendar from "../assets/calendar.svg";
import { Star, Heart } from "lucide-react";
import emojiHappy from "../assets/emoji-happy.svg";
import genre from "../assets/Genre.svg";
import Loader from "../components/Loading";

export function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const movieTitle = Number(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: movie, isLoading: isLoadingMovie } = useQuery({
    queryKey: ["movie", movieTitle],
    queryFn: () => getMovieDetail(movieTitle),
    enabled: !!movieTitle,
  });

  const { data: credits, isLoading: isLoadingCredits } = useQuery({
    queryKey: ["movie", movieTitle, "credits"],
    queryFn: () => getMovieCredits(movieTitle),
  });

  const handleFavorite = () => {
    if (!movie) return;
    toggleFavorite(movie);
  };

  if (isLoadingMovie || isLoadingCredits) {
    return (
      <div className="flex h-screen items-center justify-center bg-black scale-180">
        <Loader />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Movie not found
      </div>
    );
  }

  const isLiked = movie ? isFavorite(movie) : false;
  const rating = movie.vote_average.toFixed(1);
  const formattedDate = movie.release_date
    ? new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(movie.release_date))
    : "N/A";

  return (
    <div className="relative p-4 md:p-30">
      <div className="absolute inset-0 z-0 top-0 left-0 right-0 h-[392px] md:h-[700px]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 md:via-black/80 to-transparent" />
      </div>
      <div className="flex flex-wrap md:flex-nowrap pt-[222px] gap-4 md:gap-6 z-10 relative">
        <div className="w-[30%] md:w-[260px] md:shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="contents  md:flex md:flex-col md:justify-start md:w-full">
          <div className="flex flex-col gap-1 md:gap-6 text-left flex-1 min-w-0">
            <h1 className="font-bold text-xl md:text-[40px]">{movie.title}</h1>
            <div className="flex gap-1 h-8 items-center">
              <img src={calendar} alt="calendar" />
              <p className="text-sm md:text-[16px]">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 md:mb-6 w-full md:w-auto order-3 md:order-none">
            <button className="bg-primary-300 cursor-pointer md:w-[220px] h-11 rounded-full hover:bg-red-700 text-white px-8 py-3 flex font-semibold items-center gap-3 justify-center transition-colors w-full">
              Watch Trailer
              <div className="bg-white p-0.5 rounded-full w-4 h-4 flex items-center justify-center">
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
            <div className="flex items-center shrink-0 justify-center h-11 md:h-13 md:w-13 w-11 rounded-full bg-[#0A0D1299] border border-neutral-900">
              <button
                onClick={handleFavorite}
                className={`cursor-pointer ${
                  isLiked ? "border-red-500 text-red-500" : ""
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500" : ""}`} />
              </button>
            </div>
          </div>

          <div className="flex mt-6 md:mt-0 md:mb-12 gap-3 md:gap-5 w-full order-4 md:order-none">
            <div className="w-full p-4 border border-neutral-800 rounded-2xl flex flex-col justify-center align-middle items-center gap-2">
              <div className=" text-yellow-500 h-5">
                <Star className="w-5 h-5 fill-yellow-500" />
              </div>
              <p>Rating</p>
              <p className="line-clamp-1 font-semibold text-lg">{rating}/10</p>
            </div>
            <div className="w-full p-4 border border-neutral-800 rounded-2xl flex flex-col justify-center align-middle items-center gap-2">
              <img src={genre} alt="genre" className="h-5" />
              <p>Genre</p>
              <p className="line-clamp-1 font-semibold text-lg">
                {movie.genres?.[0]?.name || "N/A"}
              </p>
            </div>
            <div className="w-full p-4 border border-neutral-800 rounded-2xl flex flex-col justify-center align-middle items-center gap-2">
              <img src={emojiHappy} alt="Age Limit" />
              <p>Age Limit</p>
              <p className="line-clamp-1 font-semibold text-lg">
                {movie.adult ? "18" : "13"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-left flex flex-col gap-1.5 md:gap-2">
        <h2 className="text-xl md:text-[32px] font-semibold mt-6 md:mt-12">
          Overview
        </h2>
        <p className="text-neutral-400">{movie.overview}</p>
      </div>

      {credits && credits.cast.length > 0 && (
        <div className="mt-12 md:mt-20">
          <h3 className="text-2xl md:text-[32px] font-semibold m-0 mb-6 md:mb-10 text-left">
            Cast & Crew
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 overflow-x-auto pb-4">
            {credits.cast.slice(0, 6).map((actor) => (
              <div
                key={actor.id}
                className="flex-shrink-0 items-center text-center flex w-full gap-4"
              >
                <div className="w-1/6 md:w-1/5">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-full rounded-lg shrink-0 object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm md:text-[16px] md:mb-1 font-semibold m-0 mb-1 truncate">
                    {actor.name}
                  </p>
                  <p className="text-xs md:text-[14px] text-white/60 m-0 truncate">
                    {actor.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
