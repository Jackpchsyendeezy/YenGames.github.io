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
      "Racing"
    ];
    
    defaultCategories.forEach(categoryName => {
      this.createCategory({ name: categoryName });
    });
    
    // Add some default games from fizzerz.com
    const defaultGames: InsertGame[] = [
      {
        title: "Neon Racer",
        description: "Race through futuristic neon-lit cityscapes in this fast-paced arcade racing game. Drift around corners, collect power-ups, and outrun your opponents to claim victory!",
        thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        gameUrl: "https://fizzerz.com/games/slope",
        category: "Racing",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Forest Adventure",
        description: "Explore a magical forest, collect treasures and defeat enemies in this action-packed platformer. Jump, dodge, and use special abilities to overcome challenging obstacles.",
        thumbnailUrl: "https://pixabay.com/get/g47cb6c016de01ae62c4cc9ce02ccb712bee6eca010485f6734633abb6e0d3a3fe75dececb58e1c308258db7e32668ee4db2736a25d3997076e519559502ace6d_1280.jpg",
        gameUrl: "https://fizzerz.com/games/jump",
        category: "Adventure",
        isFeatured: true,
        popular: false,
        isNew: true
      },
      {
        title: "Galaxy Puzzle",
        description: "Solve challenging puzzles to create beautiful constellations and discover new galaxies. Exercise your brain with increasingly complex levels.",
        thumbnailUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        gameUrl: "https://fizzerz.com/games/crossy-chicken",
        category: "Puzzle",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Pixel Dungeon",
        description: "Explore dangerous dungeons, defeat monsters and collect loot in this retro pixel adventure. A roguelike game with permanent death and procedurally generated levels.",
        thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        gameUrl: "https://fizzerz.com/games/sticky-ninja",
        category: "Arcade",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Basketball Pro",
        description: "Test your shooting skills and become a basketball legend in this addictive sports game. Make perfect shots, compete in tournaments, and unlock special abilities.",
        thumbnailUrl: "https://pixabay.com/get/g169efc54d66f06d99d30d839f3bea96d1961dcb3193a335816c49d099f5e00187294fca0cdb2674e494702016334fe830e735d924fa33971d69a0be2b2e785c8_1280.jpg",
        gameUrl: "https://fizzerz.com/games/basket-ball",
        category: "Sports",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Castle Defense",
        description: "Build towers, train troops and defend your castle against waves of enemy attackers. Strategic tower defense with resource management.",
        thumbnailUrl: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        gameUrl: "https://fizzerz.com/games/snowball-battle",
        category: "Strategy",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Block Blast",
        description: "Match colorful blocks to create powerful combos and clear the board in this addictive puzzle game. Chain reactions lead to satisfying explosions and high scores.",
        thumbnailUrl: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        gameUrl: "https://fizzerz.com/games/blocks-game",
        category: "Puzzle",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Zombie Survival",
        description: "Survive the zombie apocalypse by crafting weapons and building defenses in this action game. Fight off hordes of the undead in this thrilling survival adventure.",
        thumbnailUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        gameUrl: "https://fizzerz.com/games/zombie-survival",
        category: "Action",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Speed Racer",
        description: "Race against opponents on challenging tracks and upgrade your car to become the champion. Feel the adrenaline of high-speed competition!",
        thumbnailUrl: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        gameUrl: "https://fizzerz.com/games/car-parking",
        category: "Racing",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Wilderness Explorer",
        description: "Explore vast wilderness, discover hidden treasures and complete quests in this open-world adventure. Face the elements and wildlife in a beautiful natural setting.",
        thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        gameUrl: "https://fizzerz.com/games/stack-ball",
        category: "Adventure",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "PCHS Sports Challenge",
        description: "Compete in multiple sports events representing Park City High School in this fun minigame collection. Show your school spirit and athletic skills!",
        thumbnailUrl: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        gameUrl: "https://fizzerz.com/games/basket-ball",
        category: "Sports",
        isFeatured: false,
        popular: true,
        isNew: true
      },
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
