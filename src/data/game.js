import { DivideIcon as LucideIcon, Sword, Trophy, Brain, Crosshair, Gamepad2, Clock, Car, Globe, Ghost, Rocket } from 'lucide-react';

/**
 * @typedef {Object} Game
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {number} rating
 * @property {string} players
 * @property {string} genre
 * @property {string} image
 * @property {string[]} screenshots
 * @property {string} developer
 * @property {string} publisher
 * @property {string} releaseDate
 * @property {string} category
 */

/**
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} name
 * @property {any} icon  // Replace 'any' with the specific type if needed
 * @property {string} description
 * @property {string} image
 */


export const categories = [
  {
    id: 1,
    name: "Action",
    icon: Sword,
    description: "Fast-paced games focused on combat and reflexes",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "RPG",
    icon: Trophy,
    description: "Story-rich adventures with character progression",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Strategy",
    icon: Brain,
    description: "Test your tactical and strategic thinking",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "FPS",
    icon: Crosshair,
    description: "Competitive first-person shooter games",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Sports",
    icon: Gamepad2,
    description: "Competitive sports games",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Casual",
    icon: Clock,
    description: "Relaxing games for all skill levels",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    name: "Racing",
    icon: Car,
    description: "High-speed racing and driving simulations",
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    name: "Open World",
    icon: Globe,
    description: "Vast explorable worlds with freedom of choice",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80"
  },
  {
    id: 9,
    name: "Horror",
    icon: Ghost,
    description: "Survival horror and psychological thrillers",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80"
  },
  {
    id: 10,
    name: "Sci-Fi",
    icon: Rocket,
    description: "Futuristic and space-themed adventures",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80"
  }
];

export const games = [
  // RPG Genre
  {
    id: 1,
    title: "Cyberpunk 2077",
    description: "An open-world action-adventure RPG set in Night City, where power, glamour, and body modification are everything.",
    rating: 4.5,
    players: "125K",
    genre: "RPG",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80"
    ],
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    releaseDate: "Dec 10, 2020",
    category: "RPG"
  },
  {
    id: 2,
    title: "The Witcher 3: Wild Hunt",
    description: "A story-driven RPG where you play as Geralt of Rivia, a monster hunter on a quest to find his adopted daughter.",
    rating: 4.9,
    players: "500K",
    genre: "RPG",
    image: "https://images.unsplash.com/photo-1570203587-739f8f9d9f8e?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1569518038-651f9479a4c5?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1569518199-15da51c0567f?auto=format&fit=crop&q=80"
    ],
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    releaseDate: "May 19, 2015",
    category: "RPG"
  },
  {
    id: 3,
    title: "Final Fantasy XV",
    description: "An action-RPG where you play as Noctis and his companions as they journey through the kingdom of Lucis.",
    rating: 4.7,
    players: "200K",
    genre: "RPG",
    image: "https://images.unsplash.com/photo-1570525985-26ac55d3f0e7?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1569518135-e4c00e84a0ff?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570525970-e428c00d8d34?auto=format&fit=crop&q=80"
    ],
    developer: "Square Enix",
    publisher: "Square Enix",
    releaseDate: "Nov 29, 2016",
    category: "RPG"
  },
  {
    id: 4,
    title: "Elden Ring",
    description: "An action RPG set in a dark fantasy world created by Hidetaka Miyazaki and George R. R. Martin.",
    rating: 4.8,
    players: "500K",
    genre: "RPG",
    image: "https://images.unsplash.com/photo-1614635175-97b348e71b7e?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1614635184-cbcd6c5b1c51?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1614635183-bf97449983c7?auto=format&fit=crop&q=80"
    ],
    developer: "FromSoftware",
    publisher: "Bandai Namco Entertainment",
    releaseDate: "Feb 25, 2022",
    category: "RPG"
  },
  {
    id: 5,
    title: "Persona 5",
    description: "A stylish RPG where you play as a high school student leading a double life as a phantom thief.",
    rating: 4.9,
    players: "150K",
    genre: "RPG",
    image: "https://images.unsplash.com/photo-1513476660619-4ab466c02f7a?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1513476891131-309a41e4d879?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513476891124-bc7e3b3e6939?auto=format&fit=crop&q=80"
    ],
    developer: "Atlus",
    publisher: "Atlus",
    releaseDate: "Sep 15, 2016",
    category: "RPG"
  },
  {
    id: 6,
    title: "Dragon Age: Inquisition",
    description: "An epic RPG where you play as the Inquisitor, leading a team to close rifts between the world of Thedas and the fade.",
    rating: 4.7,
    players: "100K",
    genre: "RPG",
    image: "https://images.unsplash.com/photo-1505140473809-e6206eae8e34?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1505140498271-21beada15ea1?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505140520345-f9ea6ab0177f?auto=format&fit=crop&q=80"
    ],
    developer: "BioWare",
    publisher: "Electronic Arts",
    releaseDate: "Nov 18, 2014",
    category: "RPG"
  },
  {
    id: 7,
    title: "Skyrim",
    description: "An open-world RPG set in the Elder Scrolls universe, where you play as the Dragonborn tasked with saving the world.",
    rating: 4.9,
    players: "1M",
    genre: "RPG",
    image: "https://images.unsplash.com/photo-1558037049-85ec3547d349?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1558037101-040a0788a9d1?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558037117-1c1be9ccdbb3?auto=format&fit=crop&q=80"
    ],
    developer: "Bethesda Game Studios",
    publisher: "Bethesda Softworks",
    releaseDate: "Nov 11, 2011",
    category: "RPG"
  },
  {
    id: 8,
    title: "Mass Effect 2",
    description: "A sci-fi RPG where you play as Commander Shepard, tasked with saving the galaxy from a race of ancient machines.",
    rating: 4.8,
    players: "200K",
    genre: "RPG",
    image: "https://images.unsplash.com/photo-1571839286034-78f34b51d1ea?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1571839270422-3586fc6a3d43?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571839268012-4b7b0a82c407?auto=format&fit=crop&q=80"
    ],
    developer: "BioWare",
    publisher: "Electronic Arts",
    releaseDate: "Jan 26, 2010",
    category: "RPG"
  },
  {
    id: 9,
    title: "Horizon Zero Dawn",
    description: "An open-world action RPG where you play as Aloy, a young hunter navigating a post-apocalyptic world filled with robotic creatures.",
    rating: 4.8,
    players: "300K",
    genre: "RPG",
    image: "https://images.unsplash.com/photo-1602160468-c99f9d705d4f?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1602160457-1b23d9e3a48d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602160470-4be432d5f3e2?auto=format&fit=crop&q=80"
    ],
    developer: "Guerrilla Games",
    publisher: "Sony Interactive Entertainment",
    releaseDate: "Feb 28, 2017",
    category: "RPG"
  },

  // FPS Genre
  {
    id: 10,
    title: "DOOM Eternal",
    description: "Rip and tear through hordes of demons in this fast-paced FPS.",
    rating: 4.7,
    players: "140K",
    genre: "FPS",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80"
    ],
    developer: "id Software",
    publisher: "Bethesda Softworks",
    releaseDate: "Mar 20, 2020",
    category: "FPS"
  },
  {
    id: 11,
    title: "Overwatch 2",
    description: "Team-based FPS with unique heroes, fast-paced gameplay, and strategic objectives.",
    rating: 4.4,
    players: "300K",
    genre: "FPS",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80"
    ],
    developer: "Blizzard Entertainment",
    publisher: "Blizzard Entertainment",
    releaseDate: "Oct 4, 2022",
    category: "FPS"
  },
  {
    id: 12,
    title: "Call of Duty: Modern Warfare II",
    description: "A tactical military shooter that continues the legacy of the iconic franchise with modern combat.",
    rating: 4.7,
    players: "200K",
    genre: "FPS",
    image: "https://images.unsplash.com/photo-1602686735-496064d4389f?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1602686745-590989a25124?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602686745-24c4f87a7018?auto=format&fit=crop&q=80"
    ],
    developer: "Infinity Ward",
    publisher: "Activision",
    releaseDate: "Oct 28, 2022",
    category: "FPS"
  },
  {
    id: 13,
    title: "Rainbow Six Siege",
    description: "A tactical FPS where you play as an elite operative trying to counter terrorist threats.",
    rating: 4.5,
    players: "350K",
    genre: "FPS",
    image: "https://images.unsplash.com/photo-1507147025154-ef2d3fe50b49?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1507147056452-dfa57b64c23e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507147058461-e8204acb3d61?auto=format&fit=crop&q=80"
    ],
    developer: "Ubisoft",
    publisher: "Ubisoft",
    releaseDate: "Dec 1, 2015",
    category: "FPS"
  },
  {
    id: 14,
    title: "Battlefield V",
    description: "A World War II-themed FPS that brings large-scale warfare with destructible environments and intense firefights.",
    rating: 4.3,
    players: "500K",
    genre: "FPS",
    image: "https://images.unsplash.com/photo-1581641440347-38e697d93b76?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1581641440601-d2255d3e6d1b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581641440789-d6c325f4002e?auto=format&fit=crop&q=80"
    ],
    developer: "EA DICE",
    publisher: "Electronic Arts",
    releaseDate: "Nov 20, 2018",
    category: "FPS"
  },
  {
    id: 15,
    title: "Apex Legends",
    description: "A fast-paced battle royale FPS with unique characters and abilities.",
    rating: 4.6,
    players: "600K",
    genre: "FPS",
    image: "https://images.unsplash.com/photo-1613077410507-cba38a6f55d0?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1613077446799-e3a63c9f8c92?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1613077446791-b4974be6a12e?auto=format&fit=crop&q=80"
    ],
    developer: "Respawn Entertainment",
    publisher: "Electronic Arts",
    releaseDate: "Feb 4, 2019",
    category: "FPS"
  },
  {
    id: 16,
    title: "Counter-Strike: Global Offensive",
    description: "A tactical FPS with team-based objectives, where players face off in a battle between terrorists and counter-terrorists.",
    rating: 4.7,
    players: "1M",
    genre: "FPS",
    image: "https://images.unsplash.com/photo-1613077410507-cba38a6f55d0?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1613077446799-e3a63c9f8c92?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1613077446791-b4974be6a12e?auto=format&fit=crop&q=80"
    ],
    developer: "Valve",
    publisher: "Valve",
    releaseDate: "Aug 21, 2012",
    category: "FPS"
  },
  {
    id: 17,
    title: "Far Cry 5",
    description: "An open-world FPS set in Montana, where you must confront a doomsday cult.",
    rating: 4.4,
    players: "300K",
    genre: "FPS",
    image: "https://images.unsplash.com/photo-1581597432137-4f524deaa948?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1581597445333-f62eaeec80f0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581597446004-9c10c31d8655?auto=format&fit=crop&q=80"
    ],
    developer: "Ubisoft",
    publisher: "Ubisoft",
    releaseDate: "Mar 27, 2018",
    category: "FPS"
  },
  {
    id: 34,
    title: "FIFA 20",
    description: "The popular soccer game with realistic gameplay, including Volta Football mode and career improvements.",
    rating: 4.5,
    players: "600K",
    genre: "Sports",
    image: "https://images.unsplash.com/photo-1610172952430-3bb4a88b1d69?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1610172952494-65cbe4177d8e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610172952317-6d40562044b4?auto=format&fit=crop&q=80"
    ],
    developer: "EA Sports",
    publisher: "Electronic Arts",
    releaseDate: "Sep 27, 2019",
    category: "Sports"
  },
  {
    id: 35,
    title: "MLB The Show 21",
    description: "The most realistic baseball game with deep gameplay mechanics, new stadiums, and improved graphics.",
    rating: 4.6,
    players: "400K",
    genre: "Sports",
    image: "https://images.unsplash.com/photo-1610172952624-d86c5da4c49e?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1610172952346-542aa2c03698?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610172952425-96e2f12d33c7?auto=format&fit=crop&q=80"
    ],
    developer: "SIE San Diego Studio",
    publisher: "Sony Interactive Entertainment",
    releaseDate: "Apr 20, 2021",
    category: "Sports"
  },
  {
    id: 36,
    title: "NBA Live 19",
    description: "A fast-paced basketball game featuring authentic gameplay and iconic NBA players.",
    rating: 4.3,
    players: "250K",
    genre: "Sports",
    image: "https://images.unsplash.com/photo-1610172952703-4fca4cc59eb8?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1610172952813-67f0b9bc59c7?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610172952920-82f6e8fe520f?auto=format&fit=crop&q=80"
    ],
    developer: "EA Sports",
    publisher: "Electronic Arts",
    releaseDate: "Oct 9, 2018",
    category: "Sports"
  },
  {
    id: 37,
    title: "NHL 21",
    description: "The ultimate ice hockey simulation game with improved player animations and a new Be A Pro mode.",
    rating: 4.4,
    players: "150K",
    genre: "Sports",
    image: "https://images.unsplash.com/photo-1610172952770-9b122fa9ba18?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1610172952950-b9db2fbb8bc3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610172953120-d19a982663f3?auto=format&fit=crop&q=80"
    ],
    developer: "EA Vancouver",
    publisher: "Electronic Arts",
    releaseDate: "Oct 16, 2020",
    category: "Sports"
  },
  {
    id: 38,
    title: "WWE 2K20",
    description: "A wrestling game featuring iconic WWE Superstars with the most immersive career mode.",
    rating: 4.2,
    players: "350K",
    genre: "Sports",
    image: "https://images.unsplash.com/photo-1610172952899-7fc8d519ee2b?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1610172952860-e9b98c16bde9?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610172952641-e75f8a0e6c9a?auto=format&fit=crop&q=80"
    ],
    developer: "Visual Concepts",
    publisher: "2K Sports",
    releaseDate: "Oct 22, 2019",
    category: "Sports"
  },
  {
    id: 39,
    title: "F1 2020",
    description: "A racing game featuring the Formula 1 championship with all teams, drivers, and circuits.",
    rating: 4.8,
    players: "500K",
    genre: "Sports",
    image: "https://images.unsplash.com/photo-1610172952966-6edbba2e9674?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1610172953071-5accc8b62e91?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610172953197-56b7a9c3e9a7?auto=format&fit=crop&q=80"
    ],
    developer: "Codemasters",
    publisher: "Codemasters",
    releaseDate: "Jul 10, 2020",
    category: "Sports"
  },
  {
    id: 40,
    title: "Pro Evolution Soccer 2021",
    description: "A soccer simulation game with updated rosters, realistic AI, and dynamic ball physics.",
    rating: 4.7,
    players: "650K",
    genre: "Sports",
    image: "https://images.unsplash.com/photo-1610172952545-81a50c3b4b72?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1610172952681-d4281e3a034f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610172953197-bfaeb5cbeff0?auto=format&fit=crop&q=80"
    ],
    developer: "Konami",
    publisher: "Konami",
    releaseDate: "Sep 15, 2020",
    category: "Sports"
  },
  {
    id: 41,
    title: "TrackMania",
    description: "A fast-paced arcade racing game with unique and crazy tracks, full of stunts and speed challenges.",
    rating: 4.6,
    players: "200K",
    genre: "Sports",
    image: "https://images.unsplash.com/photo-1610172953206-9fda50d35c6f?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1610172953331-4c7ea2b835fc?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610172953413-b5c90ea9c178?auto=format&fit=crop&q=80"
    ],
    developer: "Nadeo",
    publisher: "Ubisoft",
    releaseDate: "Mar 24, 2020",
    category: "Sports"
  },
  {
    id: 42,
    title: "Steep",
    description: "A winter sports game where you can ski, snowboard, or paraglide through an open-world mountain environment.",
    rating: 4.4,
    players: "300K",
    genre: "Sports",
    image: "https://images.unsplash.com/photo-1610172953503-6b72c88550c4?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1610172953580-b3468ed2cc12?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610172953691-bb8b4676c8db?auto=format&fit=crop&q=80"
    ],
    developer: "Ubisoft Annecy",
    publisher: "Ubisoft",
    releaseDate: "Dec 2, 2016",
    category: "Sports"
  },
  {
    id: 43,
    title: "Grand Theft Auto V",
    description: "Experience an open-world action-adventure game with dynamic missions, thrilling car chases, and intense gunfights.",
    rating: 4.9,
    players: "700K",
    genre: "Action",
    image: "https://wallpaperaccess.com/full/120394.jpg",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560028-f07c5db5a5ae?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560060-dca70be4f021?auto=format&fit=crop&q=80"
    ],
    developer: "Rockstar North",
    publisher: "Rockstar Games",
    releaseDate: "Sep 17, 2013",
    category: "Action"
  },
  {
    id: 44,
    title: "Spider-Man: Miles Morales",
    description: "Play as Miles Morales in this thrilling action game where you swing through New York City and fight against supervillains.",
    rating: 4.8,
    players: "500K",
    genre: "Action",
    image: "https://images.unsplash.com/photo-1587314560331-3d93f2f36f52?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560226-77a7ec9ad8f3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560151-b04540e8724d?auto=format&fit=crop&q=80"
    ],
    developer: "Insomniac Games",
    publisher: "Sony Interactive Entertainment",
    releaseDate: "Nov 12, 2020",
    category: "Action"
  },
  {
    id: 45,
    title: "Assassin's Creed Odyssey",
    description: "An open-world action RPG set in Ancient Greece, filled with exploration, combat, and mythology.",
    rating: 4.7,
    players: "450K",
    genre: "Action",
    image: "https://images.unsplash.com/photo-1587314560145-bb42c42e360e?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560199-510ebee3497b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560253-bba3c99ac032?auto=format&fit=crop&q=80"
    ],
    developer: "Ubisoft Montreal",
    publisher: "Ubisoft",
    releaseDate: "Oct 5, 2018",
    category: "Action"
  },
  {
    id: 46,
    title: "The Witcher 3: Wild Hunt",
    description: "A story-driven action RPG where you play as Geralt of Rivia, hunting monsters and making life-altering decisions.",
    rating: 4.9,
    players: "1M",
    genre: "Action",
    image: "https://images.unsplash.com/photo-1587314560239-e5b764a2fc47?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560311-229f684ad1e2?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560403-16a59d80312b?auto=format&fit=crop&q=80"
    ],
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    releaseDate: "May 19, 2015",
    category: "Action"
  },
  {
    id: 47,
    title: "Red Dead Redemption 2",
    description: "An open-world action-adventure game set in the late 1800s where you play as Arthur Morgan in the wild west.",
    rating: 4.9,
    players: "600K",
    genre: "Action",
    image: "https://images.unsplash.com/photo-1587314560455-88ea7db2b7a3?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560392-6789b5fd3d9b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560491-f73a732100ed?auto=format&fit=crop&q=80"
    ],
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "Oct 26, 2018",
    category: "Action"
  },
  {
    id: 48,
    title: "Horizon Zero Dawn",
    description: "Explore a post-apocalyptic world and battle robotic creatures in this action RPG with a gripping narrative.",
    rating: 4.8,
    players: "350K",
    genre: "Action",
    image: "https://images.unsplash.com/photo-1587314560524-cfbb4565a070?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560371-8719e6d86fd1?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560470-47196b0b15d9?auto=format&fit=crop&q=80"
    ],
    developer: "Guerrilla Games",
    publisher: "Sony Interactive Entertainment",
    releaseDate: "Feb 28, 2017",
    category: "Action"
  },
  {
    id: 49,
    title: "Tomb Raider (2013)",
    description: "The reboot of the classic action-adventure series, where Lara Croft uncovers secrets while fighting for survival.",
    rating: 4.6,
    players: "500K",
    genre: "Action",
    image: "https://images.unsplash.com/photo-1587314560560-59f317b98312?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560447-b6c7bb2d35a3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560602-375036d53694?auto=format&fit=crop&q=80"
    ],
    developer: "Crystal Dynamics",
    publisher: "Square Enix",
    releaseDate: "Mar 5, 2013",
    category: "Action"
  },
  {
    id: 50,
    title: "Batman: Arkham Knight",
    description: "A dark and action-packed adventure where you take on the role of Batman in a Gotham under siege.",
    rating: 4.7,
    players: "450K",
    genre: "Action",
    image: "https://images.unsplash.com/photo-1587314560653-8e0cae28c12e?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560547-3b55ff0a5e7d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560589-bd740fc58233?auto=format&fit=crop&q=80"
    ],
    developer: "Rocksteady Studios",
    publisher: "Warner Bros. Interactive Entertainment",
    releaseDate: "Jun 23, 2015",
    category: "Action"
  },
  {
    id: 51,
    title: "Sekiro: Shadows Die Twice",
    description: "An action-packed samurai game set in feudal Japan, where you must fight to survive and seek revenge.",
    rating: 4.8,
    players: "400K",
    genre: "Action",
    image: "https://images.unsplash.com/photo-1587314560615-1b44a71b2bc1?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560466-71b7ba6320c3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560629-7fd132a56fcf?auto=format&fit=crop&q=80"
    ],
    developer: "FromSoftware",
    publisher: "Activision",
    releaseDate: "Mar 22, 2019",
    category: "Action"
  },
  {
    id: 52,
    title: "Civilization VI",
    description: "Build an empire from the ground up, engage in diplomacy, war, and science, and lead your civilization to victory.",
    rating: 4.8,
    players: "600K",
    genre: "Strategy",
    image: "https://images.unsplash.com/photo-1587314560732-f76cf55797d3?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560667-95e1ac2eec02?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560703-5e557346b1be?auto=format&fit=crop&q=80"
    ],
    developer: "Firaxis Games",
    publisher: "2K Games",
    releaseDate: "Oct 21, 2016",
    category: "Strategy"
  },
  {
    id: 53,
    title: "Starcraft II",
    description: "A real-time strategy game where players control one of three factions to engage in tactical battles and strategize victory.",
    rating: 4.7,
    players: "500K",
    genre: "Strategy",
    image: "https://images.unsplash.com/photo-1587314560786-c7b76e24fa9e?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560729-122c66f0e173?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560800-21c46b20a047?auto=format&fit=crop&q=80"
    ],
    developer: "Blizzard Entertainment",
    publisher: "Blizzard Entertainment",
    releaseDate: "Jul 27, 2010",
    category: "Strategy"
  },
  {
    id: 54,
    title: "Age of Empires IV",
    description: "A real-time strategy game where you build, manage resources, and battle to lead your civilization to greatness.",
    rating: 4.6,
    players: "350K",
    genre: "Strategy",
    image: "https://images.unsplash.com/photo-1587314560754-b68c7e340941?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560713-68e199ec7591?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560785-b16ed3106762?auto=format&fit=crop&q=80"
    ],
    developer: "Relic Entertainment",
    publisher: "Xbox Game Studios",
    releaseDate: "Oct 28, 2021",
    category: "Strategy"
  },
  {
    id: 55,
    title: "Total War: Three Kingdoms",
    description: "A strategy game set in ancient China where players control various factions, using both diplomacy and combat to expand their empires.",
    rating: 4.7,
    players: "400K",
    genre: "Strategy",
    image: "https://images.unsplash.com/photo-1587314560857-d37fd3f05d83?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560704-6d33cf8a38eb?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560895-9c77cb43e0f3?auto=format&fit=crop&q=80"
    ],
    developer: "Creative Assembly",
    publisher: "Sega",
    releaseDate: "May 23, 2019",
    category: "Strategy"
  },
  {
    id: 56,
    title: "XCOM 2",
    description: "Lead a team of soldiers to battle alien invaders in this tactical turn-based strategy game.",
    rating: 4.8,
    players: "450K",
    genre: "Strategy",
    image: "https://images.unsplash.com/photo-1587314560961-e36cce1e04ac?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560898-b6be201b1c78?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560846-9da71e747bfc?auto=format&fit=crop&q=80"
    ],
    developer: "Firaxis Games",
    publisher: "2K Games",
    releaseDate: "Feb 5, 2016",
    category: "Strategy"
  },
  {
    id: 57,
    title: "Company of Heroes 2",
    description: "A real-time strategy game where players command military units in a variety of World War II scenarios.",
    rating: 4.5,
    players: "250K",
    genre: "Strategy",
    image: "https://images.unsplash.com/photo-1587314561021-849e2e2ff344?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560912-3cf3b77649ac?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314561011-1d3c589fe719?auto=format&fit=crop&q=80"
    ],
    developer: "Relic Entertainment",
    publisher: "Sega",
    releaseDate: "Jun 25, 2013",
    category: "Strategy"
  },
  {
    id: 58,
    title: "Rise of Nations",
    description: "A real-time strategy game where you lead a nation from the ancient era to the modern day, managing resources, diplomacy, and warfare.",
    rating: 4.6,
    players: "300K",
    genre: "Strategy",
    image: "https://images.unsplash.com/photo-1587314561063-0cb8a51935ca?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314561055-cb40ba098875?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314561106-22f56efb72ed?auto=format&fit=crop&q=80"
    ],
    developer: "Big Huge Games",
    publisher: "Microsoft Studios",
    releaseDate: "May 21, 2003",
    category: "Strategy"
  },
  {
    id: 59,
    title: "Northgard",
    description: "A real-time strategy game where you control a clan of Vikings, building settlements, gathering resources, and facing dangerous enemies.",
    rating: 4.5,
    players: "200K",
    genre: "Strategy",
    image: "https://images.unsplash.com/photo-1587314561113-d22536c85072?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314561041-d4e17f8e84f0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314561125-f66de24f80fc?auto=format&fit=crop&q=80"
    ],
    developer: "Shiro Games",
    publisher: "Shiro Games",
    releaseDate: "Mar 7, 2017",
    category: "Strategy"
  },
  {
    id: 60,
    title: "Command & Conquer: Red Alert 3",
    description: "Command your troops in this real-time strategy game set during a fictional Cold War, engaging in tactical battles to lead your faction to victory.",
    rating: 4.4,
    players: "150K",
    genre: "Strategy",
    image: "https://images.unsplash.com/photo-1587314561039-d22fe3daefae?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560980-c674755b4f64?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560931-9c24c35a5cc9?auto=format&fit=crop&q=80"
    ],
    developer: "EA Los Angeles",
    publisher: "Electronic Arts",
    releaseDate: "Oct 28, 2008",
    category: "Strategy"
  },
  {
    id: 61,
    title: "Stardew Valley",
    description: "A farming simulator where you build your farm, engage with the community, and explore various activities.",
    rating: 4.9,
    players: "800K",
    genre: "Casual",
    image: "https://images.unsplash.com/photo-1600562475-c742fa858fe6?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560763-50c1f51e7757?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560727-f3bcb4f3791a?auto=format&fit=crop&q=80"
    ],
    developer: "ConcernedApe",
    publisher: "ConcernedApe",
    releaseDate: "Feb 26, 2016",
    category: "Casual"
  },
  {
    id: 62,
    title: "The Sims 4",
    description: "A life simulation game where players create and control people, build homes, and shape the lives of characters.",
    rating: 4.6,
    players: "1M",
    genre: "Casual",
    image: "https://images.unsplash.com/photo-1550467274-ea84272c48c2?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560843-27d876a19e9b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560827-bb7da34bdb43?auto=format&fit=crop&q=80"
    ],
    developer: "Maxis",
    publisher: "Electronic Arts",
    releaseDate: "Sep 2, 2014",
    category: "Casual"
  },
  {
    id: 63,
    title: "Animal Crossing: New Horizons",
    description: "A life simulation game where you build your dream island, decorate, and interact with charming animal residents.",
    rating: 4.8,
    players: "2M",
    genre: "Casual",
    image: "https://images.unsplash.com/photo-1600562476-bb47e3e2834a?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560781-561e1d306f8c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560802-6d1fe6b30cb1?auto=format&fit=crop&q=80"
    ],
    developer: "Nintendo",
    publisher: "Nintendo",
    releaseDate: "Mar 20, 2020",
    category: "Casual"
  },
  {
    id: 64,
    title: "Tetris Effect",
    description: "A mesmerizing take on the classic puzzle game, featuring stunning visuals and music.",
    rating: 4.7,
    players: "500K",
    genre: "Casual",
    image: "https://images.unsplash.com/photo-1571774096154-967f3037da4c?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560789-3b1accc240b4?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560798-e2d5fc0eb02e?auto=format&fit=crop&q=80"
    ],
    developer: "Monstars Inc.",
    publisher: "Enhance Games",
    releaseDate: "Nov 9, 2018",
    category: "Casual"
  },
  {
    id: 65,
    title: "Candy Crush Saga",
    description: "Match colorful candies to progress through various levels in this addictive puzzle game.",
    rating: 4.5,
    players: "10M",
    genre: "Casual",
    image: "https://images.unsplash.com/photo-1587314560852-bb2a499e9fd6?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560921-c84568d42da4?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560907-9452d7a2b767?auto=format&fit=crop&q=80"
    ],
    developer: "King",
    publisher: "King",
    releaseDate: "Apr 12, 2012",
    category: "Casual"
  },
  {
    id: 66,
    title: "FarmVille 2",
    description: "A casual farming simulation game where players can grow crops, raise animals, and build their farm.",
    rating: 4.4,
    players: "800K",
    genre: "Casual",
    image: "https://images.unsplash.com/photo-1617109549118-d0241d0b1d5d?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560863-ef5a28dada26?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560884-f88b4aef61f3?auto=format&fit=crop&q=80"
    ],
    developer: "Zynga",
    publisher: "Zynga",
    releaseDate: "Oct 9, 2012",
    category: "Casual"
  },
  {
    id: 67,
    title: "Farm Frenzy",
    description: "A farming simulation game where you run a farm and complete tasks to grow your farm into a successful business.",
    rating: 4.3,
    players: "300K",
    genre: "Casual",
    image: "https://images.unsplash.com/photo-1587314560875-47b59758f8fa?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560803-e7cfc6f7c2f9?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560840-6a4d4b7be9be?auto=format&fit=crop&q=80"
    ],
    developer: "Alawar Entertainment",
    publisher: "Alawar Entertainment",
    releaseDate: "Jul 2, 2007",
    category: "Casual"
  },
  {
    id: 68,
    title: "Bubble Shooter",
    description: "Pop bubbles of matching colors to clear the screen in this classic arcade-style casual game.",
    rating: 4.5,
    players: "1M",
    genre: "Casual",
    image: "https://images.unsplash.com/photo-1617149819241-360dc7d89727?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560861-38e747dd960f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560864-39772b60a413?auto=format&fit=crop&q=80"
    ],
    developer: "Ilyon Dynamics",
    publisher: "Ilyon Dynamics",
    releaseDate: "Sep 28, 2015",
    category: "Casual"
  },
  {
    id: 69,
    title: "Monument Valley",
    description: "A visually stunning puzzle game where you guide a character through impossible architecture and optical illusions.",
    rating: 4.8,
    players: "600K",
    genre: "Casual",
    image: "https://images.unsplash.com/photo-1587314560851-28c8c5e50e2d?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560899-d59e2a44e52c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560926-315d64a32d24?auto=format&fit=crop&q=80"
    ],
    developer: "ustwo games",
    publisher: "ustwo games",
    releaseDate: "Apr 3, 2014",
    category: "Casual"
  },
  {
    id: 70,
    title: "Need for Speed: Heat",
    description: "Race through the streets of Palm City, completing missions and competing in street races to earn respect and rewards.",
    rating: 4.6,
    players: "500K",
    genre: "Racing",
    image: "https://images.unsplash.com/photo-1587314561026-bc78070e6e34?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314561018-f3020b828960?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560968-9a35ed72a7b9?auto=format&fit=crop&q=80"
    ],
    developer: "Ghost Games",
    publisher: "Electronic Arts",
    releaseDate: "Nov 8, 2019",
    category: "Racing"
  },
  {
    id: 71,
    title: "Forza Horizon 4",
    description: "An open-world racing game featuring a dynamic weather system and a vast variety of cars to race through Britain.",
    rating: 4.7,
    players: "600K",
    genre: "Racing",
    image: "https://images.unsplash.com/photo-1587314560915-1fd29caaac67?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560855-2c2c9730d3d0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560892-5a63e5d4b8eb?auto=format&fit=crop&q=80"
    ],
    developer: "Playground Games",
    publisher: "Microsoft Studios",
    releaseDate: "Oct 2, 2018",
    category: "Racing"
  },
  {
    id: 72,
    title: "Mario Kart 8 Deluxe",
    description: "A fun and fast-paced kart racing game where players race through various Mario-themed tracks, using power-ups and speed boosts.",
    rating: 4.8,
    players: "1M",
    genre: "Racing",
    image: "https://images.unsplash.com/photo-1587314560990-2b788f2f5a5a?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560950-e76ca96ea50c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560890-62a14a5a748b?auto=format&fit=crop&q=80"
    ],
    developer: "Nintendo EPD",
    publisher: "Nintendo",
    releaseDate: "Apr 28, 2017",
    category: "Racing"
  },
  {
    id: 73,
    title: "Gran Turismo 7",
    description: "A highly realistic racing simulator offering a wide variety of cars and tracks from around the world.",
    rating: 4.7,
    players: "400K",
    genre: "Racing",
    image: "https://images.unsplash.com/photo-1587314560956-839f93bc0705?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560913-418f3d198f7f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560998-faf1202951a7?auto=format&fit=crop&q=80"
    ],
    developer: "Polyphony Digital",
    publisher: "Sony Interactive Entertainment",
    releaseDate: "Mar 4, 2022",
    category: "Racing"
  },
  {
    id: 74,
    title: "Dirt Rally 2.0",
    description: "A rally racing game offering intense off-road racing through mud, snow, and gravel.",
    rating: 4.6,
    players: "300K",
    genre: "Racing",
    image: "https://images.unsplash.com/photo-1587314560923-f4621715e018?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560901-e6516a1c20a1?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560954-16f10a9849f7?auto=format&fit=crop&q=80"
    ],
    developer: "Codemasters",
    publisher: "Codemasters",
    releaseDate: "Feb 26, 2019",
    category: "Racing"
  },
  {
    id: 75,
    title: "Need for Speed: Most Wanted",
    description: "An arcade-style street racing game featuring illegal street races, car customization, and intense police chases.",
    rating: 4.8,
    players: "900K",
    genre: "Racing",
    image: "https://images.unsplash.com/photo-1587314560849-7f58e1b4b09c?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560894-13f4e5ea5b27?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560869-ff9b8b720d1a?auto=format&fit=crop&q=80"
    ],
    developer: "Criterion Games",
    publisher: "Electronic Arts",
    releaseDate: "Oct 30, 2012",
    category: "Racing"
  },
  {
    id: 76,
    title: "F1 2020",
    description: "The official game of the 2020 FIA Formula One World Championship, featuring realistic racing, tracks, and teams.",
    rating: 4.6,
    players: "500K",
    genre: "Racing",
    image: "https://images.unsplash.com/photo-1587314560991-e9fa3d6ab3a3?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314561017-0e13acb1c3b9?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560912-4d0e1adf5691?auto=format&fit=crop&q=80"
    ],
    developer: "Codemasters",
    publisher: "Codemasters",
    releaseDate: "Jul 10, 2020",
    category: "Racing"
  },
  {
    id: 77,
    title: "Burnout Paradise Remastered",
    description: "A high-speed, crash-heavy open-world racing game with exhilarating takedowns and destructive gameplay.",
    rating: 4.7,
    players: "700K",
    genre: "Racing",
    image: "https://images.unsplash.com/photo-1587314560941-0361d8cfc378?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560964-8b0c7a3ab5ba?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560857-064fd45a47b1?auto=format&fit=crop&q=80"
    ],
    developer: "Criterion Games",
    publisher: "Electronic Arts",
    releaseDate: "Mar 16, 2018",
    category: "Racing"
  },
  {
    id: 78,
    title: "TrackMania Turbo",
    description: "A fast-paced racing game featuring crazy tracks, vibrant environments, and exhilarating speed.",
    rating: 4.5,
    players: "300K",
    genre: "Racing",
    image: "https://images.unsplash.com/photo-1587314560917-d54bcff8ff96?auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1587314560927-bc1ca8b5b602?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314560889-faf23b68db76?auto=format&fit=crop&q=80"
    ],
    developer: "Nadeo",
    publisher: "Ubisoft",
    releaseDate: "Mar 24, 2016",
    category: "Racing"
  }


];






const getGamesByCategory = (categoryName) => {
  return games.filter(game => game.category.toLowerCase() === categoryName.toLowerCase());
};
