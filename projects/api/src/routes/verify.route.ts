import express from 'express';
import analyzerService from '../services/analyzer.service';

const router = express.Router();

router.post('/', async (req, res) => {
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).json({ error: "Comment is required" });
  }

  try {
    const result = await analyzerService.analyzeComment(comment);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to analyze comment" });
  }
});

export default router;
