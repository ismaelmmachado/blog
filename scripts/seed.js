#!/usr/bin/env node
/** Seed script - populate blog with initial content */
import { createWriteStream } from 'fs';
import { join } from 'path';

const postsDir = join(process.cwd(), 'src', 'content', 'posts');
const mkdirp = async (dir) => {
  import('fs').then(fs => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

const posts = [
  {
    id: '1',
    title: 'Getting Started with AI Agents',
    slug: 'getting-started-with-ai-agents',
    excerpt: 'Learn the basics of AI agents and how they work',
    content: '# Getting Started with AI Agents\n\nAI agents are software systems that can perceive their environment, reason about it, and take actions to achieve goals.',
    tags: ['ai', 'agents', 'basics'],
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Tool Use in AI Systems',
    slug: 'tool-use-in-ai-systems',
    excerpt: 'How AI agents leverage tools to extend their capabilities',
    content: '# Tool Use in AI Systems\n\nAI agents can use external tools to extend their capabilities, from calculators to web search.',
    tags: ['ai', 'tools', 'capabilities'],
    createdAt: new Date(),
  },
];

const stream = createWriteStream(join(postsDir, 'getting-started-with-ai-agents.md'));
stream.write(JSON.stringify(posts, null, 2));
stream.end();

console.log('Seed complete');