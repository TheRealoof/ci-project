/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import environment from './environment';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

// Login route
app.get('/api/login', async (req, res) => {
  const redirectUri = encodeURIComponent("http://localhost:3333/api/login/callback");
  const clientId = encodeURIComponent("1336719529014853652");
  const scope = encodeURIComponent("guilds+identify");
  const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
  res.redirect(url);
});

const port = environment.port;
const server = app.listen(port, () => {
  console.log(`Listening at ${environment.apiBaseUrl}`);
});
server.on('error', console.error);
