import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPopularMovies, getNowPlayingMovies } from "../lib/api";
import { HeroSection } from "../components/HeroSection";
import { MovieSlider } from "../components/MovieSlider";
import { MovieGrid } from "../components/MovieGrid";
import Loader from "../components/Loading";

export function Home() {
  const {
    data: popularMovies,
    isLoading: isLoadingPopular,
    isError: isErrorPopular,
    error: errorPopular,
  } = useQuery({
    queryKey: ["movies", "nowPlaying"],
    queryFn: () => getNowPlayingMovies(),
  });

  const {
    data: newReleaseData,
    isLoading: isLoadingNewRelease,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError: isErrorNewRelease,
    error: errorNewRelease,
  } = useInfiniteQuery({
    queryKey: ["movies", "newRelease"],
    queryFn: ({ pageParam }) => getPopularMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  if (isLoadingPopular || isLoadingNewRelease) {
    return (
      <div className="flex h-screen items-center justify-center bg-black scale-180">
        <Loader />
      </div>
    );
  }

  if (isErrorPopular || isErrorNewRelease) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-red-500">
        <p>Error loading movies. Please check console for details.</p>
        <p>{errorPopular?.message || errorNewRelease?.message}</p>
      </div>
    );
  }

  const featuredMovie = popularMovies?.results?.[0];
  const allNewReleaseMovies =
    newReleaseData?.pages.flatMap((page) => page.results) || [];

  if (!featuredMovie && allNewReleaseMovies.length === 0) {
    return <div className="text-white p-10">No data found.</div>;
  }

  return (
    <div className="bg-black p-0 min-h-screen text-white">
      {featuredMovie && <HeroSection movie={featuredMovie} />}

      <div className="px-4 text-left md:px-30">
        <section className="mb-8 md:mb-20">
          <h2 className="text-2xl md:text-4xl font-bold">Trending Now</h2>
          <MovieSlider movies={popularMovies?.results || []} />
        </section>

        <section className="pb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-10">
            New Release
          </h2>
          <div className="relative">
            <MovieGrid movies={allNewReleaseMovies} />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 z-10 bg-gradient-to-t from-black from-2% md:from-5% via-transparent via-20% md:via-60% to-transparent pointer-events-none" />
          </div>

          {hasNextPage && (
            <div className="-mt-18 z-50 absolute left-0 right-0 flex justify-center">
              <button
                className="bg-black/60 border md:w-60 md:h-14 md:text-[16px] border-neutral-900 backdrop-blur-md hover:bg-black/80 text-white font-bold py-2 px-6 rounded-full flex items-center transition"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Memuat...
                  </>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
