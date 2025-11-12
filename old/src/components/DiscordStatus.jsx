import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music, Gamepad2 } from "lucide-react";

const DiscordStatus = () => {
  const [discordUser, setDiscordUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [activities, setActivities] = useState([]);
  const [spotify, setSpotify] = useState(null);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [activityIcon, setActivityIcon] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = "653615551427641365";

  useEffect(() => {
    const updateStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const { data } = await res.json();
        setDiscordUser(data.discord_user);
        setStatus(data.discord_status);
        setActivities(data.activities || []);
        setSpotify(data.spotify);

        // Processa Spotify
        if (data.spotify) {
          setCurrentActivity({
            type: 'spotify',
            song: data.spotify.song,
            artist: data.spotify.artist,
            albumArt: data.spotify.album_art_url
          });
          setActivityIcon(data.spotify.album_art_url);
          setLoading(false);
          return;
        }

        // Processa Jogo
        const game = data.activities?.find(a => a.type === 0);
        if (game) {
          let img = null;
          if (game.assets?.large_image) {
            const asset = game.assets.large_image;
            if (asset.startsWith("mp:external")) {
              img = asset.replace("mp:", "https://media.discordapp.net/");
            } else {
              img = `https://cdn.discordapp.com/app-assets/${game.application_id}/${asset}.png`;
            }
          }
          setCurrentActivity({
            type: 'game',
            name: game.name,
            image: img
          });
          setActivityIcon(img);
          setLoading(false);
          return;
        }

        // Processa Status Personalizado
        const custom = data.activities?.find(a => a.type === 4);
        if (custom) {
          setCurrentActivity({
            type: 'custom',
            state: custom.state,
            emoji: custom.emoji
          });
          setActivityIcon(null);
          setLoading(false);
          return;
        }

        // Nenhuma atividade
        setCurrentActivity(null);
        setActivityIcon(null);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar status do Discord:", error);
        setLoading(false);
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const statusColors = {
    online: "#43b581",
    idle: "#faa61a",
    dnd: "#f04747",
    offline: "#747f8d"
  };

  if (loading)
    return (
      <section className="py-20 px-6 max-w-2xl mx-auto">
        <div className="bg-zinc-900/60 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800/50 text-center">
          <p className="text-gray-400">Carregando status do Discord...</p>
        </div>
      </section>
    );

  if (!discordUser)
    return (
      <section className="py-20 px-6 max-w-2xl mx-auto">
        <div className="bg-zinc-900/60 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800/50 text-center">
          <p className="text-gray-400">
            Não foi possível carregar o status do Discord.
          </p>
        </div>
      </section>
    );

  const gameActivity = activities?.find((a) => a.type === 0);

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
            O que estou fazendo?
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-b from-[#36393f] via-[#2f3136] to-[#282b30] backdrop-blur-lg rounded-3xl overflow-hidden border border-zinc-700/30 glow-card transition-all duration-300 max-w-md mx-auto shadow-2xl"
        >
          {/* Banner com imagem */}
          <div 
            className="h-32 bg-cover bg-center relative"
            style={{
              backgroundImage: `url('/assets/dc/programming-code-abstract-screen-software-260nw-2526471169.webp')`,
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay escuro para melhor contraste */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>
          </div>

          {/* Avatar sobreposto */}
          <div className="px-6 pb-6">
            <div className="flex flex-col">
              <motion.div 
                className="relative -mt-14 mb-4 w-fit"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=256`}
                  alt={discordUser.username}
                  className="w-28 h-28 rounded-full border-4 border-[#36393f] shadow-lg"
                />
                <motion.div
                  className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-[#36393f] shadow-md"
                  style={{ backgroundColor: statusColors[status] || "#747f8d" }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Nome e username */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white">
                  {discordUser.global_name || discordUser.username}
                </h3>
                <p className="text-[#b5b6b8] text-sm">@{discordUser.username}</p>
              </div>

              {/* Status Badge */}
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full w-fit ${
                status === 'online' ? 'bg-[#43b581]/20 text-[#43b581]' :
                status === 'idle' ? 'bg-[#faa61a]/20 text-[#faa61a]' :
                status === 'dnd' ? 'bg-[#f04747]/20 text-[#f04747]' :
                'bg-[#747f8d]/20 text-[#747f8d]'
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full ${
                  status === 'online' ? 'bg-[#43b581]' :
                  status === 'idle' ? 'bg-[#faa61a]' :
                  status === 'dnd' ? 'bg-[#f04747]' :
                  'bg-[#747f8d]'
                }`}></span>
                {status === 'online' ? 'Online' :
                 status === 'idle' ? 'Ausente' :
                 status === 'dnd' ? 'Não Perturbe' :
                 'Offline'}
              </span>
            </div>

            {/* Divisor */}
            <div className="h-px bg-white/10 my-6"></div>

            {/* Atividade */}
            <div>
              <h4 className="text-[#b5b6b8] font-semibold text-xs uppercase tracking-wider mb-4 block">
                Atividade
              </h4>

              {currentActivity?.type === 'spotify' && (
                <motion.div 
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-[#43b581]/20 hover:border-[#43b581]/40 transition-colors mb-4"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  {activityIcon && (
                    <img src={activityIcon} alt="" className="w-10 h-10 rounded flex-shrink-0 shadow-md" />
                  )}
                  {!activityIcon && <Music className="w-5 h-5 text-[#43b581] flex-shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#43b581] font-semibold text-xs uppercase">🎧 Ouvindo</p>
                    <p className="text-white font-medium text-sm truncate mt-1">{currentActivity.song}</p>
                    <p className="text-[#72767d] text-xs truncate">{currentActivity.artist}</p>
                  </div>
                </motion.div>
              )}

              {currentActivity?.type === 'game' && (
                <motion.div 
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-[#5865f2]/20 hover:border-[#5865f2]/40 transition-colors mb-4"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  {activityIcon && (
                    <img src={activityIcon} alt="" className="w-10 h-10 rounded flex-shrink-0 shadow-md" />
                  )}
                  {!activityIcon && <Gamepad2 className="w-5 h-5 text-[#5865f2] flex-shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#5865f2] font-semibold text-xs uppercase">🎮 Jogando</p>
                    <p className="text-white font-medium text-sm truncate mt-1">{currentActivity.name}</p>
                  </div>
                </motion.div>
              )}

              {currentActivity?.type === 'custom' && (
                <motion.div 
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 mb-4"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">
                      {currentActivity.emoji?.name || '💬'} {currentActivity.state}
                    </p>
                  </div>
                </motion.div>
              )}

              {!currentActivity && (
                <div className="text-center py-4 px-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-[#72767d] text-sm font-medium">
                    Nenhuma atividade no momento
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DiscordStatus;
