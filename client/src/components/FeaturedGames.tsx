import { useState, useRef } from "react";
import { useFeaturedGames } from "@/hooks/useGames";
import GameCard from "./GameCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedGames() {
  const { data: featuredGames, isLoading } = useFeaturedGames();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  // Loading skeletons
  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold font-poppins">Featured <span className="text-accent">Games</span></h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-secondary hover:bg-gray-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-secondary hover:bg-gray-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex-none w-full md:w-1/2 lg:w-1/3 bg-secondary rounded-xl overflow-hidden shadow-lg">
                <Skeleton className="w-full h-48" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  // No featured games
  if (!featuredGames || featuredGames.length === 0) {
    return null;
  }
  
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold font-poppins">Featured <span className="text-accent">Games</span></h2>
        <div className="flex space-x-2">
          <button 
            onClick={scrollPrev}
            className="p-2 rounded-full bg-secondary hover:bg-gray-700 focus:outline-none"
            aria-label="Previous games"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={scrollNext}
            className="p-2 rounded-full bg-secondary hover:bg-gray-700 focus:outline-none"
            aria-label="Next games"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
