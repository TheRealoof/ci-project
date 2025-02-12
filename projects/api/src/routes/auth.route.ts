import express from 'express';
import authService from '../services/auth.service';

const router = express.Router();

router.get('/', async (req, res) => {
  if (!req.query["redirect_uri"]) {
    res.status(400).send({ error: "redirect_uri is required" });
    return;
  }
  const redirectUri = req.query["redirect_uri"] as string;
  const url = authService.getDiscordAuthUrl(redirectUri);
  res.send({ url: url });
});

router.post('/token', async (req, res) => {
  if (!req.query["code"]) {
    res.status(400).send({ error: "code is required" });
    return;
  }
  if (!req.query["redirect_uri"]) {
    res.status(400).send({ error: "redirect_uri is required" });
    return;
  }

  const code = req.query["code"] as string;
  const redirectUri = req.query["redirect_uri"] as string;

  try {
    const token = await authService.exchangeToken(code, redirectUri);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).send();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get('/logout', async (_req, res) => {
  res.clearCookie('token');
  res.send({ message: 'Logged out' });
});

export default router;
