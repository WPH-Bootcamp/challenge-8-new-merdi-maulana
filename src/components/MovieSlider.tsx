import { useRef, useState, useEffect } from "react";
import type { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface MovieSliderProps {
  movies: Movie[];
}

export function MovieSlider({ movies }: MovieSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(false);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setScrollLeft(scrollLeft > 0);
      setScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
  }, [movies]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.7;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <section>
      <div className="flex justify-between z-10 relative top-32">
        <div className="flex justify-between absolute top-1/2  translate-y-8/9 w-full z-20 pointer-events-none px-2">
          <button
            onClick={() => scroll("left")}
            className={`cursor-pointer pointer-events-auto bg-black/50 p-2 rounded-full text-white transition-opacity ${
              scrollLeft ? "opacity-100" : "opacity-30 cursor-not-allowed"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={() => scroll("right")}
            className={`pointer-events-auto cursor-pointer bg-black/50 p-2 rounded-full text-white transition-opacity ${
              scrollRight ? "opacity-100" : "opacity-30 cursor-not-allowed"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={sliderRef}
        onScroll={checkScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {movies.map((movie, index) => (
          <div key={movie.id} className="shrink-0 w-[160px] md:w-[230px]">
            <div className="relative top-10 md:top-12 flex justify-center items-center rounded-full left-2 z-10 bg-black/60 backdrop-blur-md w-8 h-8 md:w-10 md:h-10">
              <span className="font-bold md:text-[16px]">{index + 1}</span>
            </div>

            <div>
              <MovieCard movie={movie} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
