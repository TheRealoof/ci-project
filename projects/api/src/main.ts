// main.ts
import express from "express";
import path from "path";
import { analyzeComment } from "./routes/perspective_api";

const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.post('/api/verify', async (req, res) => {
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).json({ error: "Comment is required" });
  }

  try {
    const result = await analyzeComment(comment);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to analyze comment" });
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
