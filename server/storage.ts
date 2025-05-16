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
        thumbnailUrl: "/images/thumbnails/burrito-bison.jpg",
        gameUrl: "/games/swf/burrito-bison.swf",
        category: "Action",
        isFeatured: true,
        popular: true,
        isNew: true
      },
      {
        title: "Bloons Tower Defense 5",
        description: "Strategic tower defense game where you deploy monkey towers to pop balloons before they escape. With numerous tower types, upgrades, and special abilities, this classic remains a fan favorite.",
        thumbnailUrl: "/images/thumbnails/btd5.jpg",
        gameUrl: "/games/swf/btd5.swf",
        category: "Tower Defense",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Happy Wheels",
        description: "Navigate through deadly obstacle courses with ragdoll physics in this cult classic game. Choose from various characters with unique vehicles and try to reach the finish line.",
        thumbnailUrl: "/images/thumbnails/happy-wheels.jpg",
        gameUrl: "/games/swf/happy-wheels.swf",
        category: "Action",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "Super Mario Flash 2",
        description: "Play as Mario or Luigi in this fan-made Flash game that recreates the classic Super Mario Bros experience. Jump, collect coins, and defeat enemies in this beloved platformer.",
        thumbnailUrl: "/images/thumbnails/mario-flash.jpg",
        gameUrl: "/games/swf/super-mario-flash.swf",
        category: "Platform",
        isFeatured: true,
        popular: true,
        isNew: false
      },
      {
        title: "The Impossible Quiz",
        description: "Test your wits with this notoriously difficult quiz game full of trick questions, puns, and impossible logic. Think outside the box to progress through increasingly challenging levels.",
        thumbnailUrl: "/images/thumbnails/impossible-quiz.jpg",
        gameUrl: "/games/swf/impossible-quiz.swf",
        category: "Puzzle",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Slope",
        description: "Guide a ball down a randomized slope in this fast-paced endless runner. Test your reflexes as you navigate increasingly difficult terrain and avoid obstacles.",
        thumbnailUrl: "/images/thumbnails/slope.jpg",
        gameUrl: "https://slope-game.io/",
        category: "Arcade",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Vex 4",
        description: "Navigate through challenging obstacle courses filled with deadly traps in this precision platformer. Time your jumps perfectly to avoid spikes, saws, and other hazards.",
        thumbnailUrl: "/images/thumbnails/vex4.jpg",
        gameUrl: "https://ubg365.github.io/vex4/",
        category: "Platform",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Shell Shockers",
        description: "Multiplayer FPS where you play as an egg with weapons. Crack your opponents before they crack you in this fast-paced shooter with unique egg-themed characters.",
        thumbnailUrl: "/images/thumbnails/shell-shockers.jpg",
        gameUrl: "https://shellshock.io/",
        category: "Shooter",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Krunker.io",
        description: "Fast-paced first-person shooter with blocky graphics. Choose from various classes with unique weapons and abilities to dominate the battlefield.",
        thumbnailUrl: "/images/thumbnails/krunker.jpg",
        gameUrl: "https://krunker.io/",
        category: "Shooter",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Age of War",
        description: "Strategy game where you evolve through different ages of history, from prehistoric to future. Defend your base, create units, and use special abilities to defeat your opponent.",
        thumbnailUrl: "/images/thumbnails/age-of-war.jpg",
        gameUrl: "https://www.crazygames.com/game/age-of-war",
        category: "Strategy",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Run 2",
        description: "Navigate through space in this parkour-style running game. Choose between running and skating modes as you jump across gaps and avoid falling into the void.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/run-2.swf",
        category: "Arcade",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Duck Life 3",
        description: "Train your duck in various skills like running, flying, swimming, and climbing to compete in races and tournaments. Upgrade your duck's abilities and customize its appearance.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/duck-life-3.swf",
        category: "Simulation",
        isFeatured: false,
        popular: true, 
        isNew: false
      },
      {
        title: "Duck Life 4",
        description: "The latest in the Duck Life series with improved graphics and gameplay. Train your duck in multiple skills, compete in tournaments, and become the champion of the duck racing world.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/duck-life-4.swf",
        category: "Simulation",
        isFeatured: false,
        popular: false,
        isNew: true
      },
      {
        title: "Raze 3",
        description: "Science fiction shooter featuring an alien invasion storyline. Choose your character, upgrade weapons, and battle through campaign mode or against friends in multiplayer.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/raze-3.swf",
        category: "Shooter",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Fancy Pants Adventure",
        description: "Run, jump, and slide through colorful levels as the stylish stick figure with fancy pants. Collect trophies, defeat enemies, and perform cool tricks in this platformer.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/fancy-pants-adventure.swf",
        category: "Platform",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Swords and Sandals 2",
        description: "Create a gladiator and fight your way through the arena in this turn-based combat RPG. Upgrade equipment, learn new skills, and become the champion.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/swords-and-sandals-2.swf",
        category: "RPG",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Tank Trouble 2",
        description: "Multiplayer tank battle game where you navigate mazes and shoot at opponents. Features power-ups and various game modes for competitive play.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/tank-trouble-2.swf",
        category: "Action",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Gun Mayhem 2",
        description: "Fast-paced platformer shooter where you battle against friends or AI opponents. Knock enemies off the stage using various weapons and power-ups.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/gun-mayhem-2.swf",
        category: "Action",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "ElectricMan 2",
        description: "Play as ElectricMan and use your electric powers to battle through levels of enemies. This action-packed platformer features slick combat and special moves.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/electricman-2.swf",
        category: "Action",
        isFeatured: false,
        popular: true,
        isNew: true
      },
      {
        title: "Tetris",
        description: "The classic puzzle game where you arrange falling blocks to create complete rows. Clear lines and avoid letting the blocks stack to the top.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/tetris.swf",
        category: "Puzzle",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "Pacman",
        description: "The classic arcade game where you navigate Pacman through a maze, eating dots while avoiding ghosts. Eat power pellets to turn the tables on the ghosts!",
        thumbnailUrl: "",
        gameUrl: "https://fredericjacobs.github.io/pacman/",
        category: "Classic",
        isFeatured: false,
        popular: true,
        isNew: false
      },
      {
        title: "HexGL",
        description: "A futuristic racing game built with HTML5, CSS3 and WebGL. Speed through futuristic tracks in this fast-paced 3D racing experience.",
        thumbnailUrl: "",
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
