import axios from "axios";
import type { MovieResponse, MovieDetail, MovieCredits } from "../types/movie";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_READ_ACCESS_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getPopularMovies = async (
  page: number = 1
): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/popular", {
    params: { page, language: "en-US" },
  });
  return response.data;
};

export const getNowPlayingMovies = async (
  page: number = 1
): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/now_playing", {
    params: { page, language: "en-US" },
  });
  return response.data;
};

export const getMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  const response = await api.get<MovieDetail>(`/movie/${movieId}`, {
    params: { language: "en-US" },
  });
  return response.data;
};

export const getMovieCredits = async (
  movieId: number
): Promise<MovieCredits> => {
  const response = await api.get<MovieCredits>(`/movie/${movieId}/credits`, {
    params: { language: "en-US" },
  });
  return response.data;
};

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/search/movie", {
    params: { query, page, language: "id-ID" },
  });
  return response.data;
};
