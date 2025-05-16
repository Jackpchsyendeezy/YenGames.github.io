import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Open a game in an about:blank tab to bypass restrictions
export function openGameInBlankTab(gameUrl: string, gameTitle: string) {
  // Open a new blank tab
  const newTab = window.open('about:blank', '_blank');
  
  if (!newTab) {
    console.error('Failed to open new tab');
    return;
  }
  
  // Write the game iframe to the new tab
  newTab.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${gameTitle}</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: #171923;
          color: #E2E8F0;
          font-family: 'Inter', sans-serif;
        }
        .game-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 1rem;
          background-color: #2D3748;
          border-bottom: 1px solid #4A5568;
        }
        .game-title {
          font-weight: bold;
          font-size: 1.25rem;
          margin: 0;
          color: #FF5722;
        }
        .game-frame {
          flex: 1;
          border: none;
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div class="game-container">
        <div class="game-header">
          <h1 class="game-title">${gameTitle}</h1>
        </div>
        <iframe class="game-frame" src="${gameUrl}" allowfullscreen></iframe>
      </div>
    </body>
    </html>
  `);
  
  // Close the document to prevent further writing
  newTab.document.close();
}
