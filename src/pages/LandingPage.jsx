import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowRight, Play, Star, Check, Gamepad2, Cloud, Zap, Shield } from "lucide-react";

function LandingPage() {
  const { user } = useAuth();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

  const subscriptionPlans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "month",
      features: [
        "Access to 50+ games",
        "720p streaming quality",
        "Standard support",
        "5 hours playtime per day"
      ]
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "month",
      features: [
        "Access to 100+ games",
        "1080p streaming quality",
        "Priority support",
        "Unlimited playtime",
        "Early access to new games"
      ],
      popular: true
    },
    {
      name: "Ultimate",
      price: "$29.99",
      period: "month",
      features: [
        "Access to all games",
        "4K streaming quality",
        "24/7 premium support",
        "Unlimited playtime",
        "Early access to new games",
        "Exclusive game content"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section with Video */}
      <div className="relative h-screen">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_webm.webm"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-6">
            Play Any Game, Anywhere
          </h1>
          <p className="text-xl text-gray-300 text-center mb-8 max-w-2xl">
            Experience high-quality gaming without expensive hardware. Stream your favorite games instantly on any device.
          </p>
          <div className="flex gap-4">
            {user ? (
              <Link
                to="/games"
                className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
              >
                Browse Games <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/games"
                  className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cloud Gaming Benefits */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why Choose Cloud Gaming?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl">
              <Cloud className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Instant Access</h3>
              <p className="text-gray-400">
                Start playing instantly without downloads or installations. Your games are always ready to play.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl">
              <Zap className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">High Performance</h3>
              <p className="text-gray-400">
                Experience smooth gameplay with low latency and high-quality graphics on any device.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl">
              <Shield className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Secure & Reliable</h3>
              <p className="text-gray-400">
                Your game progress is safely stored in the cloud, accessible from anywhere, anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-gray-900/50 p-8 rounded-xl border ${
                  plan.popular
                    ? "border-purple-500 scale-105"
                    : "border-gray-800"
                }`}
              >
                {plan.popular && (
                  <div className="bg-purple-500 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-purple-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors">
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            How Cloud Gaming Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-500">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Choose Your Plan</h3>
              <p className="text-gray-400">
                Select a subscription plan that suits your gaming needs
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-500">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Browse Games</h3>
              <p className="text-gray-400">
                Explore our extensive library of cloud games
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-500">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Start Playing</h3>
              <p className="text-gray-400">
                Click play and enjoy instant gaming on any device
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-500">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Save Progress</h3>
              <p className="text-gray-400">
                Your game progress is automatically saved in the cloud
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
