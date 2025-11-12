import 'dotenv/config';
import express from 'express';
import path from 'path';
import { WebSocketServer } from 'ws';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3001;

// Servir arquivos estáticos da pasta dist
app.use(express.static(path.join(__dirname, 'dist')));

// Servir o index.html para todas as rotas (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const discordUserId = '653615551427641365';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel],
});

let presenceData = null;

client.on('ready', () => {
  console.log(`Discord bot logged in as ${client.user.tag}`);
  updatePresence();
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
  if (newPresence.userId === discordUserId) {
    updatePresence();
  }
});

async function updatePresence() {
  try {
    const user = await client.users.fetch(discordUserId);
    const presence = user.presence;

    if (!presence) {
      presenceData = { discord_status: 'offline', activities: [], discord_user: { id: user.id, username: user.username, avatar: user.avatar, created_at: user.createdAt.toISOString() } };
      broadcast(presenceData);
      return;
    }

    const activities = presence.activities.map((activity) => {
      return {
        name: activity.name,
        type: activity.type,
        details: activity.details,
        state: activity.state,
        timestamps: activity.timestamps,
        assets: activity.assets,
        party: activity.party,
        syncId: activity.syncId,
        sessionId: activity.sessionId,
        flags: activity.flags,
        emoji: activity.emoji,
      };
    });

    const spotifyActivity = activities.find((a) => a.type === 2);
    const spotify = spotifyActivity ? {
      song: spotifyActivity.details,
      artist: spotifyActivity.state,
      album: spotifyActivity.assets?.large_text,
      timestamps: spotifyActivity.timestamps,
    } : null;

    presenceData = {
      discord_status: presence.status,
      activities,
      discord_user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        created_at: user.createdAt.toISOString(),
      },
      spotify,
      discord_user_flags: user.flags?.toArray() || [],
    };

    broadcast(presenceData);
  } catch (error) {
    console.error('Error updating presence:', error);
  }
}

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');
  if (presenceData) {
    ws.send(JSON.stringify(presenceData));
  }

  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });
});

function broadcast(data) {
  const message = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
}

client.login(process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN);
