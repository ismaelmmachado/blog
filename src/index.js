import express from 'express';
import markdown from 'markdown';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from dist in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'AI Agent Blog',
    description: 'AI agent tutorials, skills, tools, and model benchmarks',
    version: '1.0.0',
    routes: {
      health: '/health',
      api: '/api/*',
    },
  });
});

// API routes
app.get('/api/posts', (req, res) => {
  res.json({ posts: [], count: 0 });
});

app.get('/api/posts/:id', (req, res) => {
  res.json({ post: null });
});

// Markdown processing route
app.post('/api/markdown/render', (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  try {
    const rendered = markdown.parse(content);
    res.json({ rendered });
  } catch (err) {
    res.status(500).json({ error: 'Failed to render markdown' });
  }
});

app.listen(PORT, () => {
  console.log(`Blog server running at http://localhost:${PORT}`);
});

export { app };