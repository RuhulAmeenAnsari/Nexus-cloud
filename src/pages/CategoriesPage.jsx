import React from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins";
import { categories } from "../data/game";
import {
  Swords,
  Car,
  Plane,
  Ghost,
  Castle,
  Brain,
  Puzzle,
  Heart,
  Globe,
  Rocket,
} from "lucide-react";

function CategoriesPage() {
  const navigate = useNavigate();

  const handleViewAll = (categoryName) => {
    navigate(`/category/${categoryName.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-950">
      <div className="px-6 md:px-16 lg:px-28">
        <h1 className="text-3xl font-bold text-white font-poppins">
          Game Categories
        </h1>
        <p className="font-poppins text-gray-400 mt-3">
          Explore our diverse collection of game categories
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-3">
                  <category.icon className="w-6 h-6 text-purple-500" />
                  <h2 className="text-xl font-bold text-white">
                    {category.name}
                  </h2>
                </div>
                <p className="text-gray-300 mt-2 text-sm line-clamp-2">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-purple-400 text-sm">
                    {category.count} games available
                  </span>
                  <button
                    onClick={() => handleViewAll(category.name)}
                    className="text-white bg-purple-500/20 hover:bg-purple-500/40 px-4 py-1 rounded-full text-sm transition-colors"
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
