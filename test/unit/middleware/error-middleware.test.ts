/**
 * Error Middleware Tests
 * Tests for Express error handling middleware
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import express from 'express'

describe('Error Middleware', () => {
  it('should handle async errors in route handlers', async () => {
    const app = express()

    // Route that throws an error
    app.get('/error', async (req, res, next) => {
      try {
        throw new Error('Test error')
      } catch (err) {
        next(err)
      }
    })

    // Error handling middleware
    app.use((err: Error, req, res, next) => {
      res.status(500).json({
        error: err.message,
      })
    })

    const resp = await request(app).get('/error')
    expect(resp.status).toBe(500)
    expect(resp.body).toHaveProperty('error', 'Test error')
  })

  it('should return 404 for unknown routes', async () => {
    const app = express()

    app.use((req, res) => {
      res.status(404).json({ error: 'Not Found' })
    })

    const resp = await request(app).get('/unknown-route')
    expect(resp.status).toBe(404)
    expect(resp.body).toHaveProperty('error', 'Not Found')
  })

  it('should handle validation errors', async () => {
    const app = express()
    app.use(express.json())

    app.post('/validate', (req, res) => {
      const { content } = req.body
      if (!content) {
        const error = new Error('Content is required')
        error.status = 400
        throw error
      }
      res.json({ received: content })
    })

    // Error handling middleware
    app.use((err: Error, req, res, next) => {
      res.status(err.status || 500).json({ error: err.message })
    })

    const resp = await request(app).post('/validate').send({})
    expect(resp.status).toBe(400)
    expect(resp.body).toHaveProperty('error', 'Content is required')
  })
})