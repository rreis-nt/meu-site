import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-4 glow-text"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Hey, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Ryan</span>.
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Tech guy, designer & developer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <div className="px-6 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-sm">
            Developer
          </div>
          <div className="px-6 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm">
            Designer
          </div>
          <div className="px-6 py-2 rounded-full bg-pink-600/20 border border-pink-500/30 text-pink-300 text-sm">
            Optimizer
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;