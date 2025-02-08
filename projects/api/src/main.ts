/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import environment from './environment';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  credentials: true,
  origin: true,
}));

app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }
  req["token"] = token;
  next();
}

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/api/auth', async (req, res) => {
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

app.post('/api/auth/token', async (req, res) => {
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

app.get('/api/auth/logout', async (req, res) => {
  res.clearCookie('token');
  res.send({ message: 'Logged out' });
});

app.get('/api/user', verifyToken, async (req, res) => {
  const token: string = req["token"];
  const url = 'https://discord.com/api/users/@me';
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  res.send(await response.json());
});

const server = app.listen(environment.port, () => {
  console.log(`Listening at ${environment.apiBaseUrl}`);
});
server.on('error', console.error);
