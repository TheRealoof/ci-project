import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  const token: string = req["token"];
  const url = 'https://discord.com/api/users/@me';
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  res.send(await response.json());
});

export default router;
