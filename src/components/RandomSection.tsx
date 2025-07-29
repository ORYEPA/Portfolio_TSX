import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Dice1,
  Music,
  Gamepad2,
  Palette,
  MapPin,
  Clock,
  Zap,
  Star,
  Sparkles
} from 'lucide-react';
import ImageWithFallback from 'react-image-fallback';

export function RandomSection() {
  const placeholder = '/assets/placeholder.png';
  const [currentFact, setCurrentFact] = useState(0);

  const randomFacts = [
    "I can solve a Rubik's cube in under 2 minutes! 🧩",
    "My favorite debugging companion is a rubber duck named 'Console' 🦆",
    "I've written over 50,000 lines of code while listening to lo-fi hip hop 🎵",
    "Coffee consumption: 4 cups per day, 1,460 cups per year ☕",
    "I once spent 6 hours debugging... only to find a missing semicolon 😅",
    "My keyboard has worn-out WASD keys from too much gaming 🎮",
    "I speak 3 languages: Spanish, English, and JavaScript 💬"
  ];

  const hobbies = [
    {
      name: 'Gaming',
      icon: Gamepad2,
      description: 'Strategy games and indie titles',
      color: 'from-red-500 to-pink-500',
      image:
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop'
    },
    {
      name: 'Music Production',
      icon: Music,
      description: 'Electronic beats and ambient sounds',
      color: 'from-purple-500 to-indigo-500',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop'
    },
    {
      name: 'Digital Art',
      icon: Palette,
      description: 'UI concepts and illustrations',
      color: 'from-green-500 to-teal-500',
      image:
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop'
    },
    {
      name: 'Travel',
      icon: MapPin,
      description: 'Exploring new cultures and places',
      color: 'from-orange-500 to-yellow-500',
      image:
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop'
    }
  ];

  const quickStats = [
    { label: 'Lines of Code', value: '50K+', icon: Zap },
    { label: 'Coffee Cups', value: '1.4K+', icon: Clock },
    { label: 'Late Nights', value: '200+', icon: Star },
    { label: 'Bugs Fixed', value: '∞', icon: Sparkles }
  ];

  const shuffleFact = () => {
    const newIndex = Math.floor(Math.random() * randomFacts.length);
    setCurrentFact(newIndex);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Random Stuff
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            The fun side of me! Random facts, hobbies, and quirky stats that
            make me... well, me! Click around and discover some interesting
            (and maybe useless) information.
          </p>
        </motion.div>

        {/* Random Fact Generator */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-1 rounded-3xl shadow-2xl max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 text-center">
              <motion.div
                key={currentFact}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Random Fact #{currentFact + 1}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {randomFacts[currentFact]}
                </p>
              </motion.div>

              <motion.button
                onClick={shuffleFact}
                whileHover={{ scale: 1.05, rotateZ: 5 }}
                whileTap={{ scale: 0.95, rotateZ: -5 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 transform"
              >
                <div className="flex items-center space-x-2">
                  <Dice1 className="w-5 h-5" />
                  <span>Shuffle Fact</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{
                  scale: 1.1,
                  rotateY: 15,
                  rotateX: 5
                }}
                className="group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-purple-100 transform transition-all duration-300 group-hover:shadow-2xl">
                  <motion.div
                    animate={{
                      rotateZ: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    className="mb-3"
                  >
                    <Icon className="w-8 h-8 text-purple-500 mx-auto" />
                  </motion.div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Hobbies Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            When I'm Not Coding...
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hobbies.map((hobby, index) => {
              const Icon = hobby.icon;
              return (
                <motion.div
                  key={hobby.name}
                  initial={{ y: 100, opacity: 0, rotateX: -30 }}
                  whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'easeOut'
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    z: 50
                  }}
                  className="group cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 group-hover:shadow-2xl">
                    {/* Hobby Image */}
                    <div className="relative overflow-hidden h-32">
                      <ImageWithFallback
                        src={hobby.image}
                        fallbackImage={placeholder}
                        alt={hobby.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Icon Overlay */}
                      <div className="absolute top-4 left-4">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${hobby.color} shadow-lg`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Hobby Content */}
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                        {hobby.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {hobby.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Floating Fun Elements */}
        <div className="relative h-48 overflow-hidden">
          {[
            { icon: Sparkles, pos: { left: '10%', top: '20%' } },
            { icon: Star, pos: { right: '15%', top: '10%' } },
            { icon: Zap, pos: { left: '20%', bottom: '25%' } },
            { icon: Dice1, pos: { right: '25%', bottom: '15%' } },
            { icon: Music, pos: { left: '50%', top: '5%' } },
            { icon: Gamepad2, pos: { right: '45%', top: '40%' } }
          ].map((element, index) => {
            const Icon = element.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0.5, 1.2, 0.5],
                  opacity: [0.2, 0.6, 0.2],
                  rotateZ: [0, 360, 0],
                  y: [0, -30, 0]
                }}
                transition={{
                  duration: 4 + index * 0.3,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: 'easeInOut'
                }}
                className="absolute pointer-events-none"
                style={element.pos}
              >
                <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-full p-3 shadow-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fun Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-8"
        >
          <motion.div
            animate={{ rotateZ: [0, 2, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto shadow-lg border border-pink-100"
          >
            <p className="text-gray-700 font-medium">
              Life's too short for boring code! 🚀
            </p>
            <p className="text-sm text-gray-500 mt-2">
              - Me, probably at 3 AM
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
