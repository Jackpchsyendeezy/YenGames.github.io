
import { Handler } from '@netlify/functions'
import { storage } from '../../server/storage'

export const handler: Handler = async () => {
  try {
    const games = await storage.getPopularGames()
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(games)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch popular games" })
    }
  }
}
