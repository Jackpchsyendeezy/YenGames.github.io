import { users, type User, type InsertUser, games, type Game, type InsertGame, categories, type Category, type InsertCategory } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Game operations
  getAllGames(): Promise<Game[]>;
  getGameById(id: number): Promise<Game | undefined>;
  getFeaturedGames(): Promise<Game[]>;
  getPopularGames(): Promise<Game[]>;
  getNewGames(): Promise<Game[]>;
  getGamesByCategory(category: string): Promise<Game[]>;
  searchGames(query: string): Promise<Game[]>;
  createGame(game: InsertGame): Promise<Game>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private gamesMap: Map<number, Game>;
  private categoriesMap: Map<number, Category>;
  private userCurrentId: number;
  private gameCurrentId: number;
  private categoryCurrentId: number;

  constructor() {
    this.users = new Map();
    this.gamesMap = new Map();
    this.categoriesMap = new Map();
    this.userCurrentId = 1;
    this.gameCurrentId = 1;
    this.categoryCurrentId = 1;
    
    // Initialize with default categories
    this.initializeData();
  }

  private initializeData() {
    // Add default categories
    const defaultCategories = [
      "All Games", 
      "Arcade", 
      "Action", 
      "Adventure", 
      "Puzzle", 
      "Sports", 
      "Strategy", 
      "Racing",
      "Horror",
      "Multiplayer",
      "Simulation",
      "Idle"
    ];
    
    defaultCategories.forEach(categoryName => {
      this.createCategory({ name: categoryName });
    });
    
    // Add real games from various sources including fizzerz.com and GitHub WebGL games
    const defaultGames: InsertGame[] = [
      {
        title: "Granny",
        description: "Escape from Granny's creepy house in this tense horror game. Avoid the terrifying granny while solving puzzles and finding keys to unlock the exit before it's too late!",
        thumbnailUrl: "https://img.gamedistribution.com/6c50d4fa9d5845f7bd5504a48369e818-512x384.jpeg",
        gameUrl: "https://fizzerz.com/play/granny/",
        category: "Horror",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "2048",
        description: "Combine matching number tiles to reach the elusive 2048 tile in this addictive puzzle game. Use strategy and planning to achieve high scores and master the grid.",
        thumbnailUrl: "https://cdn.jsdelivr.net/gh/omswe/2048/meta/apple-touch-icon.png",
        gameUrl: "https://fizzerz.com/play/2048/",
        category: "Puzzle",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Among Us",
        description: "Work together as crewmates to complete tasks or secretly sabotage as the impostor in this popular multiplayer deduction game. Trust no one!",
        thumbnailUrl: "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec=w240-h480-rw",
        gameUrl: "https://fizzerz.com/play/among-us-online/",
        category: "Multiplayer",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Backrooms",
        description: "Explore the endless, uncanny yellow rooms of the Backrooms in this eerie horror game. Try to escape this liminal space while avoiding mysterious entities.",
        thumbnailUrl: "https://img.gamepix.com/games/the-backrooms/cover/the-backrooms.png?width=400&height=400",
        gameUrl: "https://fizzerz.com/play/backrooms/",
        category: "Horror",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "BitLife",
        description: "Live a virtual life from birth to death, making decisions that affect your character's happiness, health, wealth, and relationships in this life simulation game.",
        thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/53/a2/d0/53a2d095-40b7-a165-7b6b-715d574bb82f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
        gameUrl: "https://fizzerz.com/play/bitlife/",
        category: "Simulation",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Crossy Road",
        description: "Help various characters cross busy roads, rivers and train tracks in this modern take on the classic arcade game. Hop and dodge your way to a high score!",
        thumbnailUrl: "https://play-lh.googleusercontent.com/Jvmj7YfV0d3EBQVxYPzUc7x_Wc5K6nX2yYr2Cy7n0lL9zCl3mNFR_iYMdNHxMZ6SOQ=w240-h480-rw",
        gameUrl: "https://fizzerz.com/play/crossy-road/",
        category: "Arcade",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Five Nights at Freddy's",
        description: "Survive five nights as a security guard at Freddy Fazbear's Pizza, where animatronic characters come to life at night. Monitor security cameras and conserve power to stay alive.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/OXLlQKKjrRRgH2Y5JHXsYZ6FYkZqC6P_HzEGKVF8Bv_zw0_L4e5Qel2BZzNbOF5BT7Q=w240-h480-rw",
        gameUrl: "https://fizzerz.com/play/fnaf/",
        category: "Horror",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Happy Wheels",
        description: "Navigate through deadly obstacle courses with ragdoll physics in this cult classic game. Choose from various characters with unique vehicles and try to reach the finish line.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/SChpD4y61a3Ne6QCH8J-pLcB1D9GTfKI168lGzP8PgwL96M1zMmLQVzY86U7CExXRA=w240-h480-rw",
        gameUrl: "https://fizzerz.com/play/happy-wheels/",
        category: "Action",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Idle Breakout",
        description: "Break blocks automatically in this addictive idle game. Upgrade your balls, buy special abilities, and watch your destruction power grow over time.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/tsgza05Psci6cF3xI_sundSy5uLKJbTzTl9BXs42XVLubYF0ICi_tUtJg_NvnXA4Lno=s48-rw",
        gameUrl: "https://fizzerz.com/play/idle-breakout/",
        category: "Idle",
        isFeatured: false,
        popular: true,
        isNew: true
      },
      {
        title: "Jetpack Joyride",
        description: "Fly through a laboratory dodging obstacles and collecting coins in this endless runner. Equip different jetpacks, gadgets, and vehicles to improve your runs.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/Pl2nmu5U8kL-XQM10G8x-oL816i-aDqYjA4Q8iQJ4HvRdNUNvq1MgfN0JM3Xvt0_A5s=w240-h480-rw",
        gameUrl: "https://fizzerz.com/play/jetpack-joyride/",
        category: "Arcade",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Retro Bowl",
        description: "Manage your football team to glory in this retro-style American football game. Handle player morale, upgrade your roster, and lead your team to the championship.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/WRM5Y1xZmzcCP1YtO5zl6G2g7CU5c5ZfjX4UVrgi1bpNgkfy-wuB-bQx3kkeRfaGYQ=w240-h480-rw",
        gameUrl: "https://fizzerz.com/play/retro-bowl/",
        category: "Sports",
        isFeatured: false,
        popular: true,
        isNew: true
      },
      // WebGL Games from GitHub
      {
        title: "Flappy Bird",
        description: "A popular side-scroller game where you navigate a bird through pipes by tapping to flap its wings. Simple yet challenging gameplay that's incredibly addictive!",
        thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/0/0a/Flappy_Bird_icon.png",
        gameUrl: "https://uralozden.github.io/flappybirdgl/",
        category: "Arcade",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Hextris",
        description: "An addictive puzzle game inspired by Tetris, with hexagonal blocks that rotate around a hexagon. Match colors to clear blocks and earn points!",
        thumbnailUrl: "https://hextris.io/images/twitter-opengraph.png",
        gameUrl: "https://hextris.io/",
        category: "Puzzle",
        isFeatured: false,
        popular: true,
        isNew: true
      },
      {
        title: "Pacman",
        description: "The classic arcade game where you navigate Pacman through a maze, eating dots while avoiding ghosts. Eat power pellets to turn the tables on the ghosts!",
        thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pac-Man_2d.svg/800px-Pac-Man_2d.svg.png",
        gameUrl: "https://fredericjacobs.github.io/pacman/",
        category: "Arcade",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "HexGL",
        description: "A futuristic racing game built with HTML5, CSS3 and WebGL. Speed through futuristic tracks in this fast-paced 3D racing experience.",
        thumbnailUrl: "https://hexgl.bkcore.com/img/hud/logo.png",
        gameUrl: "https://hexgl.bkcore.com/play/",
        category: "Racing",
        isFeatured: true,
        popular: true,
        isNew: true
      }
    ];
    
    defaultGames.forEach(game => {
      this.createGame(game);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Game methods
  async getAllGames(): Promise<Game[]> {
    return Array.from(this.gamesMap.values());
  }

  async getGameById(id: number): Promise<Game | undefined> {
    return this.gamesMap.get(id);
  }

  async getFeaturedGames(): Promise<Game[]> {
    return Array.from(this.gamesMap.values()).filter(
      (game) => game.isFeatured
    );
  }

  async getPopularGames(): Promise<Game[]> {
    return Array.from(this.gamesMap.values()).filter(
      (game) => game.popular
    );
  }

  async getNewGames(): Promise<Game[]> {
    return Array.from(this.gamesMap.values()).filter(
      (game) => game.isNew
    );
  }

  async getGamesByCategory(category: string): Promise<Game[]> {
    if (category === "All Games") {
      return this.getAllGames();
    }
    return Array.from(this.gamesMap.values()).filter(
      (game) => game.category === category
    );
  }

  async searchGames(query: string): Promise<Game[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.gamesMap.values()).filter(
      (game) => 
        game.title.toLowerCase().includes(lowerQuery) || 
        game.description.toLowerCase().includes(lowerQuery)
    );
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const id = this.gameCurrentId++;
    const now = new Date();
    const game: Game = { 
      ...insertGame, 
      id, 
      createdAt: now,
      isFeatured: insertGame.isFeatured || false,
      popular: insertGame.popular || false,
      isNew: insertGame.isNew || false
    };
    this.gamesMap.set(id, game);
    return game;
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categoriesMap.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categoriesMap.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categoriesMap.set(id, category);
    return category;
  }
}

export const storage = new MemStorage();
