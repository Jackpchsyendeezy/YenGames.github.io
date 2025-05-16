import { usePopularGames } from "@/hooks/useGames";
import GameGrid from "@/components/GameGrid";
import { Skeleton } from "@/components/ui/skeleton";

export default function PopularGamesPage() {
  const { data: games, isLoading, error } = usePopularGames();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Popular Games</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !games) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-muted-foreground">Failed to load popular games.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Popular Games</h1>
      <GameGrid games={games} />
    </div>
  );
}