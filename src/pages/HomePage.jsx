import React from "react";
import "@fontsource/poppins"
import { Flame, Trophy, Clock } from "lucide-react";


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
    <>
      <div className="main min-h-screen pt-16  bg-gray-950">
        <div className="upperdiv  relative py-12 w-full bg-zinc-950 ">
          <div className="px-28 ">
            <h1 className="text-3xl px-8 font-bold text-white font-poppins">Featured Games</h1>
            <p className=" font-poppins text-gray-400 px-8 mt-3">Play the most popular titles instantly</p>
          </div>
          <div className="featuredGameList flex px-[120px] flex-wrap gap-8">
            {featuredGames.map((game)=>(
            <div key={game.id} className="h-[230px]  w-[400px] mt-5 ">
                <img src={game.image} alt={game.title} className="h-full w-full object-cover rounded-3xl " />
                <div className="bg-gradient-to-t absolute inset-0 from-black/30 to-transparent rounded-3xl"/>
                
            </div>
            ))}
          </div>
        </div>
        <div className="lowerdiv h-[50vh] w-full"></div>
      </div>
    </>
  );
}

export default HomePage;
