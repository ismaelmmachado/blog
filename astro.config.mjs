/**
 * Astro v7.2.1 Configuration
 * Blog similar to superbash.ai: AI agent tutorials, skills, tools, model benchmarks
 * 
 * Key patterns from AGENTS.md:
 * - Astro's built-in esbuild/vite under the hood (no direct Webpack config)
 * - Tailwind CSS optional; superbash.ai uses custom CSS with BEM patterns
 * - Content layer via getCollection or contentlayer
 * - Express backend for API routes and content serving
 * - dist/ served by Express in production
 */
export default {
  // Site metadata
  title: "superblog",
  description: "AI agent tutorials, skills, tools, and model benchmarks",
  // Base path for deployment
  base: "/",
  // Strict mode
  strict: true,
  // TypeScript checking
  typescript: true,
  // Integrations - Astro v7 style
  integrations: [
    // JSX support for React-like components
    // @astrojs/jsx is included in devDependencies
    // Tailwind CSS - optional, superbash.ai uses custom CSS
    // Uncomment to enable: // await setupTailwind(),
  ],
  // Build configuration
  build: {
    // Output directory - Express serves this in production
    outDir: "dist",
    // Assets directory
    assetsDir: "assets",
    // CSS code splitting - enabled by default
    cssCodeSplitting: true,
    // Minify HTML (default is "default")
    minify: "default",
    // Target browsers (modern)
    target: "es2022",
    // Enable component rendering
    components: true,
    // Markdown support via getCollection
    markdown: true,
  },
  // Vite configuration - Astro uses Vite under the hood
  // For custom Vite config, see vite.config.ts if needed
  vite: {
    // Extend Vite config here
    // Example: optimizeDeps: { include: ['lodash'] }
  },
  // Experimental features
  experiments: {
    // Enable new features as they graduate from experimental
  },
  // Route rules for Express integration
  // These can be used to redirect or rewrite routes
  // routes: {
  //   "/api/*": "/api/$1",
  // },
};