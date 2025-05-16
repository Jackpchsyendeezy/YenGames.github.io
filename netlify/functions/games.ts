import { Handler } from '@netlify/functions'
import { storage } from '../../server/storage'

export const handler: Handler = async (event) => {
  try {
    const idParam = event.queryStringParameters?.id

    // If an ID is provided, return a single game
    if (idParam) {
      const id = Number(idParam)
      const game = await storage.getGameById(id)

      if (!game) {
        return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Game not found' }),
        }
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game),
      }
    }

    // Otherwise, return all games
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
      body: JSON.stringify({ message: 'Failed to fetch games' }),
    }
  }
}