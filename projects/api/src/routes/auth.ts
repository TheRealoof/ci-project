import express from 'express';
import environment from '../environment';

const router = express.Router();

router.get('/', async (req, res) => {
  if (!req.query["redirect_uri"]) {
    res.status(400).send({ error: "redirect_uri is required" });
    return;
  }
  const redirectUri = encodeURIComponent(req.query["redirect_uri"] as string);
  const clientId = environment.discordClientId;
  const scope = "guilds+identify";
  const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
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

  const clientId = environment.discordClientId;
  const clientSecret = environment.discordClientSecret;
  const code = req.query["code"] as string;
  const redirectUri = req.query["redirect_uri"] as string;
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
  });
  const url = `https://discord.com/api/oauth2/token`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  const json = await response.json();
  console.log(json);

  const user = await fetch('https://discord.com/api/users/@me', {
    headers: {
      'Authorization': `Bearer ${json.access_token}`,
    }
  });

  console.log(await user.json());

  res.cookie('token', json.access_token, { httpOnly: true });
  res.send({ token: json });
});

router.get('/logout', async (_req, res) => {
  res.clearCookie('token');
  res.send({ message: 'Logged out' });
});

export default router;
