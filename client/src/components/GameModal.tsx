import type { Game } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game;
}

export default function GameModal({ isOpen, onClose, game }: GameModalProps) {
  const handleLaunchGame = () => {
    const win = window.open("about:blank");

    if (!win) {
      alert("Please allow popups for this site to play games.");
      return;
    }

    const isFlashGame = game.gameUrl.toLowerCase().endsWith(".swf");

    const html = isFlashGame
      ? `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${game.title}</title>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
            background-color: #000;
          }
          #ruffle-player {
            width: 100%;
            height: 100%;
          }
        </style>
        <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
      </head>
      <body>
        <div id="ruffle-player"></div>
        <script>
          window.RufflePlayer = window.RufflePlayer || {};
          window.addEventListener("load", () => {
            const ruffle = window.RufflePlayer.newest();
            const player = ruffle.createPlayer();
            player.allowFullscreen = true;
            player.style.width = "100%";
            player.style.height = "100%";
            document.getElementById("ruffle-player").appendChild(player);
            player.load("${window.location.origin}${game.gameUrl}");
          });
        </script>
      </body>
      </html>`
      : `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${game.title}</title>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
            background-color: #000;
          }
          iframe {
            border: none;
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <iframe src="${game.gameUrl}" allowfullscreen></iframe>
      </body>
      </html>`;

    win.document.write(html);
    win.document.close();

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-secondary text-foreground max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-poppins text-white">{game.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{game.description}</DialogDescription>
        </DialogHeader>

        <div className="bg-gray-900 rounded-lg w-full aspect-video flex items-center justify-center mb-4">
          <img
            src={game.thumbnailUrl}
            alt={game.title}
            className="h-full object-contain rounded-lg"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleLaunchGame}
            className="px-6 py-3 bg-accent hover:bg-opacity-80 transition rounded-lg font-medium"
          >
            Launch Game
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
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
