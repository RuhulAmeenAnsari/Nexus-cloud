import React from "react";
import "@fontsource/poppins";
import { Flame, Trophy, Clock, Star } from "lucide-react";

function HomePage() {
  const featuredGames = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80",
      genre: "RPG",
      rating: 4.5
    },
    {
      id: 2,
      title: "Red Dead Redemption 2",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80",
      genre: "Action",
      rating: 4.8
    },
    {
      id: 3,
      title: "The Witcher 3",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80",
      genre: "RPG",
      rating: 4.9
    }
  ];

  const categories = [
    { name: "Action", count: 245, icon: Flame },
    { name: "RPG", count: 189, icon: Trophy },
    { name: "Strategy", count: 124, icon: Clock }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-950">
      {/* Featured Games Section */}
      <div className="relative py-12 w-full bg-zinc-950">
        <div className="px-6 md:px-16 lg:px-28">
          <h1 className="text-3xl font-bold text-white font-poppins">Featured Games</h1>
          <p className="font-poppins text-gray-400 mt-3">Play the most popular titles instantly</p>
        </div>

        {/* Game List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16 lg:px-28 mt-6">
          {featuredGames.map((game) => (
            <div key={game.id} className="relative h-64 md:h-80 rounded-3xl overflow-hidden">
              <img src={game.image} alt={game.title} className="h-full w-full object-cover rounded-3xl" />
              <div className="bg-gradient-to-t absolute inset-0 from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h1 className="text-white text-xl font-bold">{game.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-purple-400 px-3 py-1 rounded-2xl bg-purple-600/20 text-sm">
                    {game.genre}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 h-5 w-5" />
                    <span className="text-white text-lg">{game.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Game Categories Section */}
      <div className="w-full py-12 bg-gray-900 mt-12">
        <div className="px-6 md:px-16 lg:px-28">
          <h1 className="text-2xl font-bold text-white font-poppins">Browse by Category</h1>
          <p className="font-poppins text-gray-400 mt-3">Find games that match your favorite genres</p>
        </div>

        {/* Category List */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 px-6 md:px-16 lg:px-28">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-3 px-6 py-3 bg-gray-800 rounded-full cursor-pointer hover:bg-purple-600 transition duration-300">
              <category.icon className="text-white h-5 w-5" />
              <span className="text-white text-lg font-poppins">{category.name}</span>
              <span className="text-gray-400 text-sm">({category.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
