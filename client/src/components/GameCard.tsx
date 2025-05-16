import { useState } from "react";
import { Link } from "wouter";
import { openGameInBlankTab } from "@/lib/utils";
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
  
  return (
    <>
      <div className={`game-card ${featured ? 'flex-none w-full md:w-1/2 lg:w-1/3' : ''}`}>
        <Link href={`/game/${game.id}`}>
          <a className="block">
            <img 
              src={game.thumbnailUrl} 
              alt={game.title} 
              className={`w-full ${featured ? 'h-48' : 'h-40'} object-cover`} 
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold font-poppins text-white`}>{game.title}</h3>
                <div className="flex gap-1">
                  {game.isNew && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                  )}
                  {game.popular && (
                    <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">Popular</span>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{game.description}</p>
              <button 
                className="play-game w-full py-2 bg-accent hover:bg-accent/80 transition rounded-lg font-medium"
                onClick={handlePlayClick}
              >
                Play Now <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
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
