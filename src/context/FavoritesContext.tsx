import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import type { Movie } from "../types/movie";

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movie: Movie) => void;
  isFavorite: (movie: Movie) => boolean;
  toggleFavorite: (movie: Movie) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      if (prev.find((m) => m.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      return prev.filter((m) => m.id !== movie.id);
    });
  };

  const isFavorite = (movie: Movie) => {
    return favorites.some((m) => m.id === movie.id);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie)) {
      removeFavorite(movie);
      toast.success("Success remove from favorites", {
        style: {
          width: "531px",
          height: "52px",
          borderRadius: "24px",
          gap: "12px",
          paddingTop: "0",
          paddingRight: "32px",
          paddingBottom: "0",
          paddingLeft: "32px",
          background: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          color: "white",
          border: "none",
        },
      });
    } else {
      addFavorite(movie);
      toast.success("Success add to favorites", {
        style: {
          width: "531px",
          height: "52px",
          borderRadius: "24px",
          gap: "12px",
          paddingTop: "0",
          paddingRight: "32px",
          paddingBottom: "0",
          paddingLeft: "32px",
          background: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          color: "white",
          border: "none",
        },
      });
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
