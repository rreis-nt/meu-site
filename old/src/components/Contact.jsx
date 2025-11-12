import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, MessageCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();

  const socials = [
    { icon: Github, label: 'GitHub', color: 'hover:text-purple-400', link: 'https://github.com/rreis-nt' },
    { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-400', link: 'https://www.linkedin.com/in/ryanreisoliveira/' },
    { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-400', link: 'https://www.instagram.com/reis.olv/' },
    { icon: MessageCircle, label: 'Discord', color: 'hover:text-indigo-400', link: 'https://discordapp.com/users/653615551427641365' },
    { icon: Mail, label: 'Email', color: 'hover:text-pink-400', link: '' } // Deixei o email sem link, caso queira adicionar depois
  ];

  const handleSocialClick = (social) => {
    if (social.link) {
      window.open(social.link, '_blank');
    } else {
      toast({
        title: "🚧 Link não configurado",
        description: `Adicione seu link do ${social.label} no código!`,
        duration: 3000,
      });
    }
  };

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Quer Trocar Uma Ideia?
          </span>
        </h2>

        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          Interessado em trabalhar juntos ou apenas quer dizer oi? Sinta-se à vontade para me contatar!
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          {socials.map((social, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialClick(social)}
              className={`w-16 h-16 rounded-full bg-zinc-900/60 backdrop-blur-lg border border-zinc-800/50 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 glow-card`}
            >
              <social.icon className="w-6 h-6" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;