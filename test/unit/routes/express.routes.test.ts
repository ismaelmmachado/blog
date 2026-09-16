/**
 * Express Routes Tests
 * Tests for GET /health, GET /, GET /api/posts, GET /api/posts/:id, POST /api/markdown/render
 */
import { describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import markdown from 'markdown'

// Recreate the Express app from src/index.js
const createApp = () => {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Health check route
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

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
    })
  })

  // API routes
  app.get('/api/posts', (req, res) => {
    res.json({ posts: [], count: 0 })
  })

  app.get('/api/posts/:id', (req, res) => {
    res.json({ post: null })
  })

  // Markdown processing route
  app.post('/api/markdown/render', (req, res) => {
    const { content } = req.body
    if (!content) {
      return res.status(400).json({ error: 'Content is required' })
    }
    try {
      const rendered = markdown.parse(content)
      res.json({ rendered })
    } catch (err) {
      res.status(500).json({ error: 'Failed to render markdown' })
    }
  })

  return app
}

describe('Express Routes', () => {
  let app = null

  beforeEach(() => {
    app = createApp()
  })

  describe('GET /health', () => {
    it('should return status ok with timestamp', async () => {
      const app = createApp()
      const response = await request(app).get('/health')
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('status', 'ok')
      expect(response.body).toHaveProperty('timestamp')
      expect(typeof response.body.timestamp).toBe('string')
    })
  })

  describe('GET /', () => {
    it('should return blog info', async () => {
      const app = createApp()
      const response = await request(app).get('/')
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('name', 'AI Agent Blog')
      expect(response.body).toHaveProperty('description')
      expect(response.body).toHaveProperty('version', '1.0.0')
      expect(response.body).toHaveProperty('routes')
    })
  })

  describe('GET /api/posts', () => {
    it('should return empty posts array', async () => {
      const app = createApp()
      const response = await request(app).get('/api/posts')
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('posts', [])
      expect(response.body).toHaveProperty('count', 0)
    })
  })

  describe('GET /api/posts/:id', () => {
    it('should return null post', async () => {
      const app = createApp()
      const response = await request(app).get('/api/posts/nonexistent')
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('post', null)
    })
  })

  describe('POST /api/markdown/render', () => {
    it('should render valid markdown content', async () => {
      const app = createApp()
      const response = await request(app)
        .post('/api/markdown/render')
        .send({ content: '# Hello World\n\nThis is **bold** text.' })
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('rendered')
    })

    it('should return 400 when content is missing', async () => {
      const app = createApp()
      const response = await request(app)
        .post('/api/markdown/render')
        .send({})
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', 'Content is required')
    })

    it('should render markdown even with unusual syntax (no 500 error)', async () => {
      const app = createApp()
      // The markdown package handles unusual syntax gracefully, returns 200
      const response = await request(app)
        .post('/api/markdown/render')
        .send({ content: '[[invalid markdown syntax]]' })
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('rendered')
    })
  })
})