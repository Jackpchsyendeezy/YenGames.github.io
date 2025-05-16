import { Handler } from '@netlify/functions'
import { storage } from '../../server/storage'

export const handler: Handler = async (event) => {
  try {
    const idParam = event.queryStringParameters?.id

    if (idParam) {
      const id = Number(idParam)
      if (!isNaN(id)) {
        const game = await storage.getGameById(id)
        if (game) {
          return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(game),
          }
        } else {
          return {
            statusCode: 404,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Game not found' }),
          }
        }
      }
    }

    // Fallback: return all games
    const games = await storage.getAllGames()
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(games),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Internal server error' }),
    }
  }
}