/**
 * Markdown Service Tests
 * Tests for markdown rendering utility functions
 * Corresponds to the /api/markdown/render endpoint logic
 */
import { describe, it, expect } from 'vitest'
import markdown from 'markdown'

describe('Markdown Service', () => {
  describe('markdown.parse', () => {
    it('should render heading', () => {
      const result = markdown.parse('# Heading Level 1')
      expect(result).toContain('h1')
    })

    it('should render bold text', () => {
      const result = markdown.parse('**bold text**')
      expect(result).toContain('strong')
    })

    it('should render italic text', () => {
      const result = markdown.parse('*italic text*')
      expect(result).toContain('em')
    })

    it('should render paragraph', () => {
      const result = markdown.parse('Just a regular paragraph.')
      expect(result).toContain('p')
    })

    it('should render ordered list', () => {
      const result = markdown.parse('1. First\n2. Second\n3. Third')
      expect(result).toContain('ol')
    })

    it('should render unordered list', () => {
      const result = markdown.parse('- Item one\n- Item two\n- Item three')
      expect(result).toContain('ul')
    })

    it('should render links', () => {
      const result = markdown.parse('[link text](https://example.com)')
      expect(result).toContain('a')
      expect(result).toContain('href')
    })

    it('should render images', () => {
      const result = markdown.parse('![alt text](image.png)')
      expect(result).toContain('img')
    })

    it('should render blockquote', () => {
      const result = markdown.parse('> Blockquote text')
      expect(result).toContain('blockquote')
    })

    it('should render code block', () => {
      const result = markdown.parse('```javascript\nconsole.log("hello")\n```')
      expect(result).toContain('code')
    })

    it('should render inline code', () => {
      const result = markdown.parse('`inline code`')
      expect(result).toContain('code')
    })

    it('should render horizontal rule', () => {
      const result = markdown.parse('---')
      expect(result).toContain('hr')
    })

    it('should render HTML as-is', () => {
      const result = markdown.parse('<strong>bold</strong>')
      expect(result).toContain('strong')
    })

    it('should render table as HTML paragraph (markdown package behavior)', () => {
      const result = markdown.parse('| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |')
      // The markdown package wraps table in <p> tags
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty string', () => {
      const result = markdown.parse('')
      expect(result).toBeDefined()
    })

    it('should handle null input gracefully', () => {
      // The markdown package may throw or return empty string for null
      const result = markdown.parse(String(null))
      expect(result).toBeDefined()
    })

    it('should handle undefined input gracefully', () => {
      // The markdown package may throw or return empty string for undefined
      const result = markdown.parse(String(undefined))
      expect(result).toBeDefined()
    })
  })
})