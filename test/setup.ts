/**
 * Test setup - runs before all tests
 * Configures jsdom for HTML rendering tests
 * and sets up Express app for route testing
 */
import { setup } from 'vitest-express-mock'
import request from 'supertest'

// Mock Express app - will be overridden in route-specific tests
let app = null

export const setupTestApp = (expressApp) => {
  app = expressApp
}

export { request }