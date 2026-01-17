import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MovieGridFavorite } from "../components/MovieGrid";
import { searchMovies } from "../lib/api";
import notFoundImg from "../assets/Frame 52.svg";
import Loader from "../components/Loading";

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-black scale-180">
        <Loader />
      </div>
    );

  return (
    <div className="mt-16 md:mt-0 py-2 flex flex-col gap-4">
      {searchResults && searchResults.results.length > 0 ? (
        <MovieGridFavorite movies={searchResults.results} />
      ) : (
        <div className="relative flex items-center justify-center h-screen ">
          <div className="flex flex-col items-center justify-center text-center">
            <img
              src={notFoundImg}
              alt="Ilustration not found img"
              className="grayscale-100"
            />
            <h2>Data Not Found</h2>
            <p>Try other keywords</p>
          </div>
        </div>
      )}
    </div>
  );
}
