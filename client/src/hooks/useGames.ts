import { useQuery } from "@tanstack/react-query";
import type { Game } from "@shared/schema";

// ✅ Fixed: Fetches one game by ID from Netlify function
export function useGame(id: number) {
  return useQuery<Game>({
    queryKey: [`/api/games/${id}`],
    queryFn: () =>
      fetch(`/.netlify/functions/games?id=${id}`).then((res) =>
        res.json()
      ),
    enabled: !!id, // only run if ID exists
  });
}

export function useAllGames() {
  return useQuery<Game[]>({
    queryKey: ["/api/games"],
    queryFn: () =>
      fetch("/.netlify/functions/games").then((res) => res.json()),
  });
}

export function useFeaturedGames() {
  return useQuery<Game[]>({
    queryKey: ["/api/featured-games"],
    queryFn: () =>
      fetch("/.netlify/functions/featured-games").then((res) => res.json()),
  });
}

export function usePopularGames() {
  return useQuery<Game[]>({
    queryKey: ["/api/popular-games"],
    queryFn: () =>
      fetch("/.netlify/functions/popular-games").then((res) => res.json()),
  });
}

export function useNewGames() {
  return useQuery<Game[]>({
    queryKey: ["/api/new-games"],
    queryFn: () =>
      fetch("/.netlify/functions/new-games").then((res) => res.json()),
  });
}

export function useGamesByCategory(category: string) {
  return useQuery<Game[]>({
    queryKey: [`/api/category-games/${category}`],
    queryFn: () =>
      fetch(`/.netlify/functions/games-by-category?category=${category}`).then(
        (res) => res.json()
      ),
    enabled: category !== "All Games", // only run if not "All Games"
  });
}

export function useSearchGames(query: string) {
  return useQuery<Game[]>({
    queryKey: [`/api/search-games?q=${query}`],
    queryFn: () =>
      fetch(`/.netlify/functions/search-games?q=${query}`).then((res) =>
        res.json()
      ),
    enabled: query.length > 0, // only run if there's a search term
  });
}