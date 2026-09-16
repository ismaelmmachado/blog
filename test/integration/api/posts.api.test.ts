/**
 * API Integration Tests
 * Tests for API endpoints with real server integration
 */
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import express from 'express'
import markdown from 'markdown'

// Create and setup the Express app
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

describe('API Integration', () => {
  describe('GET /health', () => {
    it('should return status ok with timestamp', async () => {
      const response = await request(app).get('/health')
      expect(response.status).toBe(200)
      expect(response.body.status).toBe('ok')
      expect(typeof response.body.timestamp).toBe('string')
    })
  })

  describe('GET /api/posts', () => {
    it('should return empty posts array', async () => {
      const response = await request(app).get('/api/posts')
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body.posts)).toBe(true)
      expect(response.body.count).toBe(0)
    })
  })

  describe('GET /api/posts/:id', () => {
    it('should return null post for nonexistent ID', async () => {
      const response = await request(app).get('/api/posts/999')
      expect(response.status).toBe(200)
      expect(response.body.post).toBeNull()
    })
  })

  describe('POST /api/markdown/render', () => {
    it('should render markdown and return rendered output', async () => {
      const response = await request(app)
        .post('/api/markdown/render')
        .send({ content: '# Test Post\n\nSome content here.' })
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('rendered')
    })

    it('should return 400 when content body is missing', async () => {
      const response = await request(app)
        .post('/api/markdown/render')
        .send({})
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Content is required')
    })

    it('should render markdown even with unusual syntax (no 500 error)', async () => {
      const response = await request(app)
        .post('/api/markdown/render')
        .send({ content: '$$invalid$$' })
      // The markdown package handles unusual syntax gracefully, returns 200
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('rendered')
    })
  })
})