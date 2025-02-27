/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import environment from './environment';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import auth from './routes/auth.route';
import user from './routes/user.route';
import verify from './routes/verify.route';
import messages from './routes/messages.route';

const app = express();

app.use(cors({
  credentials: true,
  origin: true,
}));

app.use(cookieParser());

app.use(express.json());

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

const router = express.Router();

app.use('/api', router);

router.get('/', (_req, res) => {
  res.send({ message: 'Welcome to api!' });
});

router.use('/auth', auth);
router.use('/user', verifyToken, user);
router.use('/verify', verify);
router.use('/messages', verifyToken, messages)

const server = app.listen(environment.apiPort, () => {
  console.log(`Listening at ${environment.apiBaseUrl}`);
});
server.on('error', console.error);
