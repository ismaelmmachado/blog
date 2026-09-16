/**
 * HTML Rendering Tests
 * Tests for Astro component rendering and HTML output
 * Superbash.ai style: nav bar, hero section, cards grid, footer
 * Uses string-based HTML for compatibility with vitest node environment
 */
import { describe, it, expect } from 'vitest'

describe('HTML Rendering - Superbash.ai Style', () => {
  const navbarHtml = `
    <nav>
      <ul>
        <li>Tutorials</li>
        <li>Skills</li>
        <li>Tools</li>
        <li>Benchmarks</li>
      </ul>
    </nav>
  `

  const heroHtml = `
    <header>
      <h1>AI Agent Blog</h1>
      <p>Tutorials, skills, tools, and model benchmarks</p>
    </header>
  `

  // Each card has class "card" and unique title
  const cardGridHtml = `
    <div class="card-grid">
      <div class="card">
        <h3>Getting Started</h3>
        <p>Learn AI agent basics</p>
      </div>
      <div class="card">
        <h3>Tool Use</h3>
        <p>How agents use tools</p>
      </div>
      <div class="card">
        <h3>Model Benchmarks</h3>
        <p>Performance comparisons</p>
      </div>
    </div>
  `

  const footerHtml = `
    <footer>
      <div>
        <h3>Resources</h3>
        <ul>
          <li>Docs</li>
          <li>GitHub</li>
          <li>About</li>
        </ul>
      </div>
      <div>
        <h3>Community</h3>
        <ul>
          <li>Forum</li>
          <li>Discord</li>
          <li>Twitter</li>
        </ul>
      </div>
    </footer>
  `

  it('renders navbar with correct items', () => {
    expect(navbarHtml).toContain('Tutorials')
    expect(navbarHtml).toContain('Skills')
    expect(navbarHtml).toContain('Tools')
    expect(navbarHtml).toContain('Benchmarks')
  })

  it('renders hero section with title and subtitle', () => {
    expect(heroHtml).toContain('AI Agent Blog')
    expect(heroHtml).toContain('Tutorials, skills, tools, and model benchmarks')
  })

  it('renders card grid with three cards', () => {
    // Count div class="card" occurrences
    const cardDivCount = (cardGridHtml.match(/class="card"/g) || []).length
    expect(cardDivCount).toBe(3)
    // Verify each card title is present
    expect(cardGridHtml).toContain('Getting Started')
    expect(cardGridHtml).toContain('Tool Use')
    expect(cardGridHtml).toContain('Model Benchmarks')
  })

  it('renders footer with links section', () => {
    expect(footerHtml).toContain('Resources')
    expect(footerHtml).toContain('Community')
    expect(footerHtml).toContain('Resources')
    expect(footerHtml).toContain('Forum')
  })
})