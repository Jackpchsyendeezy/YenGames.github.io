import { useState } from "react";
import { Link } from "wouter";
import type { Game } from "@shared/schema";
import GameModal from "./GameModal";

interface GameCardProps {
  game: Game;
  featured?: boolean;
}

export default function GameCard({ game, featured = false }: GameCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  
  // Determine background color based on category for visual variety
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      "Action": "bg-red-800",
      "Adventure": "bg-green-800",
      "Arcade": "bg-purple-800",
      "Puzzle": "bg-blue-800",
      "Strategy": "bg-amber-800",
      "Tower Defense": "bg-emerald-800",
      "Shooter": "bg-rose-800",
      "Platform": "bg-cyan-800",
      "Racing": "bg-orange-800",
      "RPG": "bg-indigo-800",
      "Sports": "bg-lime-800",
      "Classic": "bg-slate-800",
      "Flash": "bg-pink-800",
      "Idle": "bg-yellow-800",
      "Simulation": "bg-teal-800"
    };
    
    return categoryColors[category] || "bg-gray-800";
  };
  
  return (
    <>
      <div className={`game-card group ${featured ? 'flex-none w-full md:w-1/2 lg:w-1/3' : ''}`}>
        <Link href={`/game/${game.id}`}>
          <a className="block h-full">
            <div className={`h-full flex flex-col border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-lg ${getCategoryColor(game.category)}`}>
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold font-poppins text-white group-hover:text-accent transition-colors`}>
                    {game.title}
                  </h3>
                  <div className="flex gap-1">
                    {game.isNew && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                    )}
                    {game.popular && (
                      <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">Popular</span>
                    )}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-medium bg-gray-900 text-gray-300 px-2 py-1 rounded">
                    {game.category}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {game.description}
                </p>
              </div>
              <button 
                className="w-full py-3 bg-accent hover:bg-accent/80 transition-colors text-white font-medium flex items-center justify-center space-x-2"
                onClick={handlePlayClick}
              >
                <span>Play Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </a>
        </Link>
      </div>

      <GameModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        game={game}
      />
    </>
  );
}
