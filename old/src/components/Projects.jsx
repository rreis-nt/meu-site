import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Feira FATECH 2025',
      description: 'Site/portal do evento/feira, mostrando projetos, agenda e informações para visitantes.',
      tags: ['Evento', 'Frontend', 'Landing'],
      gradient: 'from-blue-500 to-cyan-500',
      link: 'https://github.com/rreis-nt/feira-fatech2025'
    },
    {
      title: 'Rich Presence',
      description: 'Integração de Rich Presence para Discord — exemplo de presença customizada e integração.',
      tags: ['Discord', 'Node', 'Presence'],
      gradient: 'from-indigo-600 to-violet-600',
      link: 'https://github.com/rreis-nt/rich-presence'
    }
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Alguns Projetos e Ideias
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-zinc-900/60 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800/50 glow-card transition-all duration-300 group"
              >
                <div className={`w-full h-2 rounded-full bg-gradient-to-r ${project.gradient} mb-4`} />

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-zinc-800/50 text-gray-300 border border-zinc-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-purple-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Ver projeto <ExternalLink className="w-4 h-4" />
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;