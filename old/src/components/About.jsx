import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Sobre Mim
          </span>
        </h2>
        
        <div className="bg-zinc-900/60 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800/50 glow-card">
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Desde pequeno, sou fascinado por tecnologia. O que começou como curiosidade em desmontar e montar PCs evoluiu para uma paixão por hardware e consequentemente por design e desenvolvimento.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Adoro explorar o universo do desenvolvimento, criar pequenos projetos por hobby e mergulhar em UI/UX para construir interfaces que sejam tão bonitas quanto funcionais. Para mim, otimizar um sistema é como uma forma de arte.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Estou sempre aprendendo algo novo e adoro compartilhar conhecimento. Quando não estou na frente do PC, provavelmente estou praticando esportes, jogando, descobrindo músicas novas ou planejando o próximo projeto.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;