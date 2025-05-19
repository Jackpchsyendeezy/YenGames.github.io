import {
  users,
  type User,
  type InsertUser,
  games,
  type Game,
  type InsertGame,
  categories,
  type Category,
  type InsertCategory,
} from "@shared/schema";

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
      "RPG",
    ];

    defaultCategories.forEach((categoryName) => {
      this.createCategory({ name: categoryName });
    });

    // Add real games including classic Flash games that work with Ruffle
    const defaultGames: InsertGame[] = [
      {
        title: "Burrito Bison: Launcha Libre",
        description:
          "Launch your luchador into a world of gummy bears in this addictive game. Smash through gummy bears, earn upgrades, and bounce your way to freedom in this wildly popular action game.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/burritobison.swf",
        category: "Action",
        isFeatured: true,
        popular: true,
        isNew: true,
      },
      {
        title: "Bloons Tower Defense 5",
        description:
          "Strategic tower defense game where you deploy monkey towers to pop balloons before they escape. With numerous tower types, upgrades, and special abilities, this classic remains a fan favorite.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/btd5.swf",
        category: "Tower Defense",
        isFeatured: true,
        popular: true,
        isNew: false,
      },
      {
        title: "Happy Wheels",
        description:
          "Navigate through deadly obstacle courses with ragdoll physics in this cult classic game. Choose from various characters with unique vehicles and try to reach the finish line.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/happy-wheels.swf",
        category: "Action",
        isFeatured: true,
        popular: true,
        isNew: false,
      },
      {
        title: "The Impossible Quiz",
        description:
          "Test your wits with this notoriously difficult quiz game full of trick questions, puns, and impossible logic. Think outside the box to progress through increasingly challenging levels.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/theimpossiblequiz.swf",
        category: "Puzzle",
        isFeatured: false,
        popular: true,
        isNew: false,
      },
      {
        title: "Slope",
        description:
          "Guide a ball down a randomized slope in this fast-paced endless runner. Test your reflexes as you navigate increasingly difficult terrain and avoid obstacles.",
        thumbnailUrl: "",
        gameUrl: "https://slopecom.com/",
        category: "Arcade",
        isFeatured: false,
        popular: true,
        isNew: false,
      },
      {
        title: "Shell Shockers",
        description:
          "Multiplayer FPS where you play as an egg with weapons. Crack your opponents before they crack you in this fast-paced shooter with unique egg-themed characters.",
        thumbnailUrl: "",
        gameUrl: "https://shellshock.io/",
        category: "Shooter",
        isFeatured: true,
        popular: true,
        isNew: false,
      },
      {
        title: "Krunker.io",
        description:
          "Fast-paced first-person shooter with blocky graphics. Choose from various classes with unique weapons and abilities to dominate the battlefield.",
        thumbnailUrl: "",
        gameUrl: "https://krunker.io/",
        category: "Shooter",
        isFeatured: true,
        popular: true,
        isNew: false,
      },
      {
        title: "Run 2",
        description:
          "Navigate through space in this parkour-style running game. Choose between running and skating modes as you jump across gaps and avoid falling into the void.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/run2.swf",
        category: "Arcade",
        isFeatured: false,
        popular: true,
        isNew: false,
      },
      {
        title: "Cookie Clicker",
        description:
          "The original idle game where you click to produce cookies, buy upgrades, and eventually build a cookie empire. Strangely addictive despite its simple premise.",
        thumbnailUrl: "",
        gameUrl: "https://orteil.dashnet.org/cookieclicker/",
        category: "Idle",
        isFeatured: false,
        popular: true,
        isNew: false,
      },
      {
        title: "1v1.LOL",
        description:
          "Build and battle in this shooting game inspired by Fortnite. Create structures for protection and outmaneuver your opponents in intense 1v1 battles.",
        thumbnailUrl: "",
        gameUrl: "https://1v1.lol/",
        category: "Shooter",
        isFeatured: false,
        popular: true,
        isNew: false,
      },
      {
        title: "2048",
        description:
          "Slide numbered tiles on a grid to combine them in this addictive puzzle game. Match tiles with the same number to create a tile with the value of 2048.",
        thumbnailUrl: "",
        gameUrl: "https://play2048.co/",
        category: "Puzzle",
        isFeatured: false,
        popular: true,
        isNew: false,
      },
      {
        title: "Retro Bowl",
        description:
          "Manage your football team to victory in this retro-style American football game. Handle team management, player drafts, and gameplay in this addictive sports title.",
        thumbnailUrl: "",
        gameUrl: "https://retrobowlunlocked.github.io/",
        category: "Sports",
        isFeatured: false,
        popular: true,
        isNew: true,
      },
      {
        title: "Flappy Bird",
        description:
          "The infamously challenging game where you guide a bird through pipes by tapping to flap its wings. Simple to learn but incredibly difficult to master.",
        thumbnailUrl: "",
        gameUrl: "https://flappybird.io/",
        category: "Arcade",
        isFeatured: false,
        popular: true,
        isNew: false,
      },
      {
        title: "Tetris",
        description:
          "The classic puzzle game where you arrange falling blocks to create complete rows. Clear lines and avoid letting the blocks stack to the top.",
        thumbnailUrl: "",
        gameUrl: "/games/swf/tetris.swf",
        category: "Puzzle",
        isFeatured: false,
        popular: true,
        isNew: false,
      },
      {
        title: "Duck Life 4",
        description:
          "Train your duck, compete in races, and explore vibrant worlds",
        thumbnailUrl: "",
        gameUrl: "/games/swf/duck-life-4.swf",
        category: "Puzzle",
        isFeatured: false,
        popular: true,
        isNew: false,
      },
      {
        title: "Geometry Dash",
        description:
          "Rhythm-based platformer where you control a cube that automatically runs, jumping and flying to avoid obstacles synchronized with the music.",
        thumbnailUrl: "",
        gameUrl: "https://scratch.mit.edu/projects/105500895/embed",
        category: "Platform",
        isFeatured: false,
        popular: true,
        isNew: false,
      },
      {
        title: "Duck Life 3",
        description:
          "Train your duck, compete in races, and explore vibrant worlds",
        thumbnailUrl: "",
        gameUrl: "/games/swf/ducklife3.swf",
        category: "Platform",
        isFeatured: false,
        popular: true,
        isNew: false,
      },
      {
        title: "HexGL",
        description:
          "A futuristic racing game built with HTML5, CSS3 and WebGL. Speed through futuristic tracks in this fast-paced 3D racing experience.",
        thumbnailUrl: "",
        gameUrl: "https://hexgl.bkcore.com/play/",
        category: "Racing",
        isFeatured: true,
        popular: true,
        isNew: true,
      },
    ];

    defaultGames.forEach((game) => {
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
    return Array.from(this.gamesMap.values()).filter((game) => game.isFeatured);
  }

  async getPopularGames(): Promise<Game[]> {
    return Array.from(this.gamesMap.values()).filter((game) => game.popular);
  }

  async getNewGames(): Promise<Game[]> {
    return Array.from(this.gamesMap.values()).filter((game) => game.isNew);
  }

  async getGamesByCategory(category: string): Promise<Game[]> {
    if (category === "All Games") {
      return this.getAllGames();
    }
    return Array.from(this.gamesMap.values()).filter(
      (game) => game.category === category,
    );
  }

  async searchGames(query: string): Promise<Game[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.gamesMap.values()).filter(
      (game) =>
        game.title.toLowerCase().includes(lowerQuery) ||
        game.description.toLowerCase().includes(lowerQuery),
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
      isNew: insertGame.isNew || false,
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
