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
      "Tower Defense",
      "Shooter",
      "Classic",
      "Flash",
      "Platform",
      "RPG"
    ];
    
    defaultCategories.forEach(categoryName => {
      this.createCategory({ name: categoryName });
    });
    
    // Add real games including classic Flash games that work with Ruffle
    const defaultGames: InsertGame[] = [
      {
        title: "Burrito Bison: Launcha Libre",
        description: "Launch your luchador into a world of gummy bears in this addictive game. Smash through gummy bears, earn upgrades, and bounce your way to freedom in this wildly popular action game.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/ixHOGAQw8AReN5QKk4xdEDwYvHFp6MAKwZMurELPzTd7LVfgKvpB5wfmyZEb9YQkdnM=w240-h480-rw",
        gameUrl: "https://funhtml5games.com/burritobison/index.html",
        category: "Action",
        isFeatured: true,
        popular: true,
        isNew: true
      },
      {
        title: "Bloons Tower Defense 5",
        description: "Strategic tower defense game where you deploy monkey towers to pop balloons before they escape. With numerous tower types, upgrades, and special abilities, this classic remains a fan favorite.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/YU2S8MXZ-Hzut_SnXLWzFRsD-5xo1kxN9xjNmYNvJIQqcwJ1HNPe_cEj1Sk9MgQ-FQ=w240-h480-rw",
        gameUrl: "https://ubicast.com/projects/Bloons/BTD5/",
        category: "Tower Defense",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Happy Wheels",
        description: "Navigate through deadly obstacle courses with ragdoll physics in this cult classic game. Choose from various characters with unique vehicles and try to reach the finish line.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/SChpD4y61a3Ne6QCH8J-pLcB1D9GTfKI168lGzP8PgwL96M1zMmLQVzY86U7CExXRA=w240-h480-rw",
        gameUrl: "https://happywheels2.io/",
        category: "Action",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Super Mario Flash 2",
        description: "Play as Mario or Luigi in this fan-made Flash game that recreates the classic Super Mario Bros experience. Jump, collect coins, and defeat enemies in this beloved platformer.",
        thumbnailUrl: "https://i.ytimg.com/vi/-hbcB-JPVGs/maxresdefault.jpg",
        gameUrl: "https://supermarioflash.io/",
        category: "Platform",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "The Impossible Quiz",
        description: "Test your wits with this notoriously difficult quiz game full of trick questions, puns, and impossible logic. Think outside the box to progress through increasingly challenging levels.",
        thumbnailUrl: "https://i.ytimg.com/vi/BgYBx2PZJiA/maxresdefault.jpg",
        gameUrl: "https://impossible-quiz.io/",
        category: "Puzzle",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Slope",
        description: "Guide a ball down a randomized slope in this fast-paced endless runner. Test your reflexes as you navigate increasingly difficult terrain and avoid obstacles.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/uJn2i9h7KxYQarC_c3K4qH6OVBi-XTjQSg5LV9G4DmG4AqKvmGZ3RvLZh_31RtQV4id5=w240-h480-rw",
        gameUrl: "https://slope-game.io/",
        category: "Arcade",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Vex 4",
        description: "Navigate through challenging obstacle courses filled with deadly traps in this precision platformer. Time your jumps perfectly to avoid spikes, saws, and other hazards.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/PLNojxLItYyEOhRCpQDSXizJY4q-1gPZ1qSRJrY7ySbJaW-XFzvJfLN1JSbQ7TxYYwFT=w240-h480-rw",
        gameUrl: "https://ubg365.github.io/vex4/",
        category: "Platform",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Shell Shockers",
        description: "Multiplayer FPS where you play as an egg with weapons. Crack your opponents before they crack you in this fast-paced shooter with unique egg-themed characters.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/RbV0RrxUBkVpR0-wyJaz_X3hV1ETLo-eDzZhIKQHFi5976Lo4C8vqsaturhYkHCFVmo",
        gameUrl: "https://shellshock.io/",
        category: "Shooter",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Krunker.io",
        description: "Fast-paced first-person shooter with blocky graphics. Choose from various classes with unique weapons and abilities to dominate the battlefield.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/hwhyKRxbzJeJmUT3NM6MF4rnH84CkGzXpxBxCHaPW2j_G9RUl3v39zO0j1URfX2Hbw",
        gameUrl: "https://krunker.io/",
        category: "Shooter",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Age of War",
        description: "Strategy game where you evolve through different ages of history, from prehistoric to future. Defend your base, create units, and use special abilities to defeat your opponent.",
        thumbnailUrl: "https://upload.wikimedia.org/wikipedia/ru/4/41/Age_of_War_logo.jpg",
        gameUrl: "https://www.crazygames.com/game/age-of-war",
        category: "Strategy",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Run 3",
        description: "Navigate through space in this parkour-style running game. Choose between running and skating modes as you jump across gaps and avoid falling into the void.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/iVCajnrRKEgtLPsE0-txQQDTUUoBiVAFIVw6HgLvjJ4Y8zAPHUNgR-FWBYJstGZakTA4",
        gameUrl: "https://ubg98.github.io/run3/",
        category: "Arcade",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Cookie Clicker",
        description: "The original idle game where you click to produce cookies, buy upgrades, and eventually build a cookie empire. Strangely addictive despite its simple premise.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/RTAZb9E639F7XzSl9J8v5T67rtUbS8lkMdoLeOMNiP822Lf1kHvti5TQwUNU88mw94c",
        gameUrl: "https://cookie-clicker2.io/",
        category: "Idle",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "1v1.LOL",
        description: "Build and battle in this shooting game inspired by Fortnite. Create structures for protection and outmaneuver your opponents in intense 1v1 battles.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/QYUAPYYgkfdeJGAKGNwkK0hEJaGfR4RDzRehQi3kMe6UQIo9Bp9pOvgGtWt1GPTnGw8",
        gameUrl: "https://1v1.lol/",
        category: "Shooter",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "2048",
        description: "Slide numbered tiles on a grid to combine them in this addictive puzzle game. Match tiles with the same number to create a tile with the value of 2048.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/JMVV3Nnwm_e_PSsxI0eNNmJ7keBP5Km9cW0sUJusYJF8OIL2FfWvLPHasW6K6hBmU0_4=w240-h480-rw",
        gameUrl: "https://play2048.co/",
        category: "Puzzle",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Retro Bowl",
        description: "Manage your football team to victory in this retro-style American football game. Handle team management, player drafts, and gameplay in this addictive sports title.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/WRM5Y1xZmzcCP1YtO5zl6G2g7CU5c5ZO4imGm_d2kS0A9OHQq9-3KEpkZIkuRUEgAw=w240-h480-rw",
        gameUrl: "https://retro-bowl.io/",
        category: "Sports",
        isFeatured: false,
        popular: true,
        isNew: true
      },
      {
        title: "Papa's Freezeria",
        description: "Run an ice cream shop in this time management cooking game. Take orders, create custom sundaes, and serve customers to earn tips and upgrade your shop.",
        thumbnailUrl: "https://i.ytimg.com/vi/kTz6KDwxCA4/maxresdefault.jpg",
        gameUrl: "https://cheerpx-flashplayer.coolmath-games.com/coolmath-games?&game=papas-freezeria",
        category: "Simulation",
        isFeatured: false,
        popular: true,
        isNew: true
      },
      {
        title: "Pacman",
        description: "The classic arcade game where you navigate Pacman through a maze, eating dots while avoiding ghosts. Eat power pellets to turn the tables on the ghosts!",
        thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pac-Man_2d.svg/800px-Pac-Man_2d.svg.png",
        gameUrl: "https://fredericjacobs.github.io/pacman/",
        category: "Classic",
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
