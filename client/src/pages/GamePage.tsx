import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useGame } from "@/hooks/useGames";
import { openGameInBlankTab } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function GamePage() {
  const [, params] = useRoute('/game/:id');
  const gameId = params?.id ? parseInt(params.id) : 0;
  const { data: game, isLoading, error } = useGame(gameId);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <a className="text-muted-foreground hover:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Games
            </a>
          </Link>
        </div>
        
        <div className="bg-secondary rounded-xl overflow-hidden shadow-lg">
          <Skeleton className="w-full h-[400px]" />
          <div className="p-6">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-3/4 mb-8" />
            <div className="flex space-x-4">
              <Skeleton className="h-12 w-36 rounded-lg" />
              <Skeleton className="h-12 w-36 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <a className="text-muted-foreground hover:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Games
            </a>
          </Link>
        </div>
        
        <div className="bg-secondary rounded-xl p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-destructive mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold mb-2">Game Not Found</h2>
          <p className="text-muted-foreground mb-6">Sorry, the game you're looking for doesn't exist or has been removed.</p>
          <Button variant="default" asChild>
            <Link href="/">
              <a>Return to Home</a>
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const handlePlayGame = () => {
    openGameInBlankTab(game.gameUrl, game.title);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/">
          <a className="text-muted-foreground hover:text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Games
          </a>
        </Link>
      </div>
      
      <div className="bg-secondary rounded-xl overflow-hidden shadow-lg">
        <div className="relative">
          <img 
            src={game.thumbnailUrl} 
            alt={game.title}
            className="w-full max-h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{game.title}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                  {game.category}
                </span>
                {game.popular && (
                  <span className="bg-accent/70 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
                {game.isNew && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">About this game</h2>
            <p className="text-muted-foreground">
              {game.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              className="bg-accent hover:bg-accent/80 text-white font-medium px-8 py-6 text-lg"
              onClick={handlePlayGame}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play Now
            </Button>
            
            <Button variant="outline" className="border-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </Button>
          </div>
        </div>
      </div>
      
      {/* Related games could be added here */}
    </div>
  );
}
