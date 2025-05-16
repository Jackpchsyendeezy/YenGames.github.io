import { useQuery } from "@tanstack/react-query";
import type { Game } from "@shared/schema";

export function useAllGames() {
  return useQuery<Game[]>({
    queryKey: ["/api/games"],
  });
}

export function useGame(id: number) {
  return useQuery<Game>({
    queryKey: [`/api/games/${id}`],
  });
}

export function useFeaturedGames() {
  return useQuery<Game[]>({
    queryKey: ["/api/featured-games"],
  });
}

export function usePopularGames() {
  return useQuery<Game[]>({
    queryKey: ["/api/popular-games"],
  });
}

export function useNewGames() {
  return useQuery<Game[]>({
    queryKey: ["/api/new-games"],
  });
}

export function useGamesByCategory(category: string) {
  return useQuery<Game[]>({
    queryKey: [`/api/category-games/${category}`],
    enabled: category !== "All Games", // Only fetch if not "All Games"
  });
}

export function useSearchGames(query: string) {
  return useQuery<Game[]>({
    queryKey: [`/api/search-games?q=${query}`],
    enabled: query.length > 0, // Only run query if there's a search term
  });
}
