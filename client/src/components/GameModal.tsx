import { useState } from "react";
import type { Game } from "@shared/schema";
import { openGameInBlankTab } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game;
}

export default function GameModal({ isOpen, onClose, game }: GameModalProps) {
  const handleLaunchGame = () => {
    openGameInBlankTab(game.gameUrl, game.title);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-secondary text-foreground max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-poppins text-white">{game.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {game.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-gray-900 rounded-lg w-full aspect-video flex items-center justify-center mb-4">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-muted-foreground mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-muted-foreground">Click "Launch Game" to start playing</p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={handleLaunchGame}
            className="px-6 py-3 bg-accent hover:bg-opacity-80 transition rounded-lg font-medium"
          >
            Launch Game 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
          
          <div className="flex space-x-2">
            <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
