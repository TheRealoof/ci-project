import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  const token = req["token"];
  const discordGuildsUri = 'https://discord.com/api/users/@me/guilds';
  const response = await fetch(discordGuildsUri, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  const guilds = await response.json();
  res.send(guilds);
});

export default router;
