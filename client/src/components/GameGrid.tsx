import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Game } from "@shared/schema";
import GameCard from "./GameCard";
import { Skeleton } from "@/components/ui/skeleton";

interface GameGridProps {
  title: string;
  games: Game[] | undefined;
  isLoading: boolean;
}

export default function GameGrid({ title, games, isLoading }: GameGridProps) {
  const [visibleGames, setVisibleGames] = useState(8); // Initial number of games to show
  
  const loadMore = () => {
    setVisibleGames(prev => prev + 8);
  };
  
  if (isLoading) {
    return (
      <section>
        <h2 className="text-2xl font-bold font-poppins mb-6">{title} <span className="text-accent">Games</span></h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-secondary rounded-xl overflow-hidden shadow-lg">
              <Skeleton className="w-full h-40" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  if (!games || games.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-bold font-poppins mb-6">{title} <span className="text-accent">Games</span></h2>
        <div className="bg-secondary rounded-xl p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold mb-2">No games found</h3>
          <p className="text-muted-foreground">Try a different category or check back later.</p>
        </div>
      </section>
    );
  }
  
  const displayedGames = games.slice(0, visibleGames);
  const hasMore = games.length > visibleGames;
  
  return (
    <section>
      <h2 className="text-2xl font-bold font-poppins mb-6">{title} <span className="text-accent">Games</span></h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button 
            onClick={loadMore}
            className="px-6 py-3 bg-secondary hover:bg-gray-700 transition rounded-lg font-medium"
          >
            Load More Games 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
