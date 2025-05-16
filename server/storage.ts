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
      "Flash"
    ];
    
    defaultCategories.forEach(categoryName => {
      this.createCategory({ name: categoryName });
    });
    
    // Add real games including classic Flash games that work with Ruffle
    const defaultGames: InsertGame[] = [
      {
        title: "Bloons Tower Defense 5",
        description: "Strategic tower defense game where you deploy monkey towers to pop balloons before they escape. With numerous tower types, upgrades, and special abilities, this classic remains a fan favorite.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/YU2S8MXZ-Hzut_SnXLWzFRsD-5xo1kxN9xjNmYNvJIQqcwJ1HNPe_cEj1Sk9MgQ-FQ=w240-h480-rw",
        gameUrl: "https://archive.org/download/armorgames/btd5.swf",
        category: "Tower Defense",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Happy Wheels",
        description: "Navigate through deadly obstacle courses with ragdoll physics in this cult classic game. Choose from various characters with unique vehicles and try to reach the finish line.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/SChpD4y61a3Ne6QCH8J-pLcB1D9GTfKI168lGzP8PgwL96M1zMmLQVzY86U7CExXRA=w240-h480-rw",
        gameUrl: "https://github.com/LeakedAZ/Ruffle-Happy-Wheels/raw/main/happywheels.swf",
        category: "Action",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Super Mario 63",
        description: "Fan-made Flash game inspired by Super Mario 64 and Super Mario Sunshine. Explore various levels, collect stars, and use FLUDD abilities in this beloved platformer.",
        thumbnailUrl: "https://archive.org/download/sm63gameart/sm63.jpg",
        gameUrl: "https://archive.org/download/armorgames/super_mario_63.swf",
        category: "Adventure",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "The Impossible Quiz",
        description: "Test your wits with this notoriously difficult quiz game full of trick questions, puns, and impossible logic. Think outside the box to progress through increasingly challenging levels.",
        thumbnailUrl: "https://static.wikia.nocookie.net/impossible-quiz/images/a/a8/Impossible_Quiz_Logo.png/revision/latest?cb=20200311153225",
        gameUrl: "https://archive.org/download/armorgames/the-impossible-quiz.swf",
        category: "Puzzle",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Duck Life 3",
        description: "Train your duck in various skills like running, flying, swimming, and climbing to compete in races and tournaments. Upgrade your duck's abilities and customize its appearance.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/uuFiwN9LJhFhVhFCF0nADTHUAnpwIwufEHpkBgBr81qr6MiHrY1FqObJn-5XMV9Avfg",
        gameUrl: "https://archive.org/download/armorgames/duck-life-3.swf",
        category: "Simulation",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Strike Force Heroes",
        description: "Fast-paced side-scrolling shooter with multiple character classes, weapons, and campaign missions. Customize your loadout and battle through challenging levels.",
        thumbnailUrl: "https://i.ytimg.com/vi/cFwrp7y49Kk/maxresdefault.jpg",
        gameUrl: "https://archive.org/download/armorgames/strike-force-heroes.swf",
        category: "Shooter",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Raze 3",
        description: "Science fiction shooter featuring an alien invasion storyline. Choose your character, upgrade weapons, and battle through campaign mode or against friends in multiplayer.",
        thumbnailUrl: "https://www.gamesgames.com/games/thumbs/13/25913.jpg",
        gameUrl: "https://archive.org/download/armorgames/raze-3.swf",
        category: "Shooter",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Age of War",
        description: "Strategy game where you evolve through different ages of history, from prehistoric to future. Defend your base, create units, and use special abilities to defeat your opponent.",
        thumbnailUrl: "https://upload.wikimedia.org/wikipedia/ru/4/41/Age_of_War_logo.jpg",
        gameUrl: "https://archive.org/download/armorgames/age-of-war.swf",
        category: "Strategy",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Run 2",
        description: "Navigate through space in this parkour-style running game. Choose between running and skating modes as you jump across gaps and avoid falling into the void.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/iVCajnrRKEgtLPsE0-txQQDTUUoBiVAFIVw6HgLvjJ4Y8zAPHUNgR-FWBYJstGZakTA4",
        gameUrl: "https://archive.org/download/armorgames/run-2.swf",
        category: "Arcade",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Learn to Fly 2",
        description: "Help a penguin achieve his dream of flight by launching him from a ramp and upgrading his equipment. Earn money through stunts and distance to buy better gear.",
        thumbnailUrl: "https://i.ytimg.com/vi/YP2hLg2oiZc/maxresdefault.jpg",
        gameUrl: "https://archive.org/download/armorgames/learn-to-fly-2.swf",
        category: "Arcade",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Kingdom Rush",
        description: "Premium tower defense game with fantasy elements. Build towers, train troops, and use special abilities to defend your kingdom against waves of enemies.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/H8_tpa1OX9LEutKRvflFzJ9_ZCu59lc8qK5eXxbYgQNgm-nqFLLZxP1LM89THt09Wbk4",
        gameUrl: "https://archive.org/download/armorgames/kingdom-rush.swf",
        category: "Tower Defense",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Papa's Pizzeria",
        description: "Time management cooking game where you run a pizza restaurant. Take orders, prepare pizzas with the right toppings, bake them properly, and serve them to customers.",
        thumbnailUrl: "https://flipline-studios.fandom.com/wiki/File:Papa%27s_Pizzeria_HD_icon_on_the_homepage.png",
        gameUrl: "https://archive.org/download/armorgames/papas-pizzeria.swf",
        category: "Simulation",
        isFeatured: false,
        popular: true,
        isNew: true
      },
      {
        title: "Gun Mayhem 2",
        description: "Fast-paced platformer shooter where you battle against friends or AI opponents. Knock enemies off the stage using various weapons and power-ups.",
        thumbnailUrl: "https://static.wikia.nocookie.net/gun-mayhem/images/8/8a/Gunmayhem2icon.png/revision/latest?cb=20200425190741",
        gameUrl: "https://archive.org/download/armorgames/gun-mayhem-2.swf",
        category: "Action",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Tank Trouble 2",
        description: "Multiplayer tank battle game where you navigate mazes and shoot at opponents. Features power-ups and various game modes for competitive play.",
        thumbnailUrl: "https://play-lh.googleusercontent.com/AdD7Lq9iK561R1jKqL1aBZfm42j9Wl3BVczVLfXdyGEGZDTyf4Y0j1yU3cU46_mUvX4",
        gameUrl: "https://archive.org/download/armorgames/tank-trouble-2.swf",
        category: "Action",
        isFeatured: false,
        popular: true,
        isNew: false
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
