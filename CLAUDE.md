# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**VNext** - AI-powered mobile-first knowledge capture PWA for Obsidian. A SvelteKit web application that provides an intelligent interface for capturing, organizing, and managing notes in an Obsidian vault through the Obsidian Local REST API plugin.

**Tech Stack:**
- **Frontend:** SvelteKit + Svelte 4
- **Styling:** TailwindCSS + Style Dictionary (design tokens)
- **PWA:** vite-plugin-pwa with workbox
- **Testing:** Vitest + Testing Library + Storybook
- **Deployment:** Vercel (adapter-vercel with SSR)
- **Backend Integration:** Obsidian Local REST API, OpenAI/Whisper API for transcription

## Essential Commands

### Development
```bash
# Start dev server with token generation (required before dev)
npm run dev                  # Builds tokens + starts dev server on :5173 with --host

# Token system (run before first dev/build)
npm run tokens:build         # Generate CSS vars + JS tokens from tokens/src/
npm run tokens:watch         # Watch mode for token development

# Code quality
npm run check                # Svelte type checking with jsconfig.json
npm run lint                 # ESLint
npm run format               # Prettier format all files
```

### Testing
```bash
npm test                     # Run Vitest in watch mode
npm run test:ui              # Vitest UI dashboard
npm run test:run             # Single run (CI)
npm run test:coverage        # Generate coverage report

# Accessibility & Performance
npm run test:contrast        # Check color contrast ratios
npm run test:a11y            # Build Storybook + run contrast tests
npm run lighthouse           # Run Lighthouse CI audit
npm run lighthouse:collect   # Collect Lighthouse metrics
npm run lighthouse:assert    # Assert against budgets
```

### Storybook
```bash
npm run storybook            # Start Storybook dev server on :6006
npm run build-storybook      # Build static Storybook
```

### Build & Deploy
```bash
npm run build                # Production build (tokens + vite build)
npm run preview              # Preview production build locally
```

## Architecture & Code Organization

### Component System (3-Layer Architecture)

**Primitives** (`src/lib/components/primitives/`)
- Foundational UI elements with no business logic
- Examples: Button, Input, Textarea, Text, Heading, Stack, Inline, Grid, Box, Container
- All use VNext design tokens (CSS variables with `--v-*` prefix)
- Props control variants (size, variant, semantic meaning)

**Composite** (`src/lib/components/composite/`)
- Business-aware components built from primitives
- Examples: Card, Modal, Form, FormField, WorkflowCard, QuickCaptureEntry
- Handle complex interactions and state management

**Domain-Specific** (`src/lib/components/dashboard/`, `vault/`, etc.)
- Feature-specific components
- Examples: StatCard, StatsOverview, FolderTree, NoteEditor

**Layout** (`src/lib/components/layout/`)
- Page structure and navigation
- PageLayout, Sidebar, BottomNav

### Design Token System

**Location:** `tokens/src/`
- `core/`: Base values (colors, spacing, typography)
- `semantic/`: Contextual tokens (interactive, surface, text)
- `themes/`: Theme-specific overrides (vnext-dark.json)

**Build Process:**
1. Style Dictionary reads JSON tokens from `tokens/src/**/*.json`
2. Generates `src/lib/styles/tokens.css` (CSS custom properties)
3. Generates `src/lib/tokens/index.js` (JS/TS exports)
4. TailwindCSS config extends with v-* utilities

**Usage in Components:**
```svelte
<!-- CSS variables -->
<div class="bg-v-primary text-v-text-primary">

<!-- Tailwind utilities (generated from tokens) -->
<button class="px-v-4 py-v-3 rounded-v-md">
```

### SvelteKit Routes

**File-based routing:**
- `src/routes/+page.svelte` - Home dashboard (4-card grid)
- `src/routes/+layout.svelte` - Root layout with navigation
- `src/routes/capture/+page.svelte` - Quick capture interface
- `src/routes/vault/+page.svelte` - File browser and note editor
- `src/routes/dashboard/+page.svelte` - Analytics dashboard
- `src/routes/timeline/+page.svelte` - Chronological note view
- `src/routes/workflows/+page.svelte` - Workflow templates

### Service Layer (`src/lib/services/`)

**obsidianApiClient.js**
- Primary API client for Obsidian Local REST API
- Handles CRUD operations for notes/folders
- Implements retry logic, timeout, offline detection
- Key methods:
  - `createNote(content, path)` - Create/update markdown file
  - `readNote(path)` - Read note content
  - `capture(data)` - High-level capture with auto-classification
  - `captureVoice(audioBlob)` - Transcribe + save voice recordings
  - `listFiles(folder)` - Browse vault structure
  - `searchNotes(query)` - Full-text search

**audioService.js**
- Voice recording with MediaRecorder API
- Audio format handling (webm/mp4)
- Recording state management

**dbService.js**
- IndexedDB wrapper for offline storage
- Caches notes, metadata, and app state

**workflowEngine.js**
- Workflow template execution
- Handles reflection, planning, creative prompts

**analysisService.js**
- Note analysis and insights generation

### State Management (`src/lib/stores/`)

**vault.js**
- Svelte stores for vault state
- `notes`, `folders`, `currentNote`, `selectedFolder`
- IndexedDB persistence layer
- Derived store: `filteredNotes` (folder-based filtering)

**Other stores:** Configuration, UI state, user preferences

### Path Aliases (svelte.config.js)

```javascript
$components → src/lib/components
$stores → src/lib/stores
$services → src/lib/services
$utils → src/lib/utils
```

### Environment Variables

**Required for full functionality:**
```bash
PUBLIC_API_URL=https://obsidian-api.chuhaihub.org  # Obsidian REST API endpoint
PUBLIC_API_KEY=your-api-key                         # API auth key
PUBLIC_VOICE_API_URL=cloudflare-workers-ai-endpoint # Voice transcription
```

**Configuration locations:**
- `.env` (local development)
- Vercel environment variables (production)
- `src/lib/utils/constants.js` (default values)

## Key Development Patterns

### Design Token Workflow
1. **Never hardcode colors/spacing/typography** - always use tokens
2. Edit tokens in `tokens/src/**/*.json`
3. Run `npm run tokens:build` to regenerate CSS/JS
4. Use generated variables: `var(--surface-bg-default)` or `.bg-v-primary`

### Component Development
1. Start with primitives, compose into composite components
2. Use Storybook for isolated development: `npm run storybook`
3. Document props with JSDoc comments
4. Export all event handlers with `on:*` forwarding
5. Use semantic HTML and ARIA attributes for accessibility

### API Integration Pattern
```javascript
import { obsidianApiClient } from '$services/obsidianApiClient.js';

try {
  const result = await obsidianApiClient.capture({
    content: userInput,
    input_type: 'text'
  });
  // Handle success
} catch (error) {
  if (error.message === 'OFFLINE') {
    // Queue for later sync
  } else if (error.message === 'TIMEOUT') {
    // Show timeout UI
  }
  // Handle other errors
}
```

### Voice Recording Flow
1. Request microphone permission via `audioService.js`
2. Record audio to blob (webm/mp4)
3. Send to `/api/transcribe` SvelteKit endpoint (avoids CORS)
4. Server-side transcription via Cloudflare Workers AI or OpenAI Whisper
5. Save transcribed text to Obsidian via `obsidianApiClient.captureVoice()`

### Testing Strategy
- **Unit tests:** Vitest for business logic and utilities
- **Component tests:** Testing Library + Vitest for Svelte components
- **Visual tests:** Storybook for component showcase
- **A11y tests:** jest-axe + manual Storybook a11y addon checks
- **E2E:** (Not yet implemented - consider Playwright)

## Critical Implementation Details

### Obsidian Local REST API Integration
- Requires Obsidian Local REST API plugin installed and enabled
- Authentication via Bearer token in headers
- PUT request to `/vault/{path}` creates/updates files
- Content-Type: `text/markdown` for markdown body (not JSON)
- Paths are relative to vault root (e.g., `Daily_Operations/Logs/2025-10-25.md`)

### PWA Configuration
- Manifest in `vite.config.js` (VitePWA plugin)
- Service worker with NetworkFirst caching for API calls
- Icons in `/static/icons/` (192x192, 512x512)
- Offline detection and graceful degradation

### Vercel Deployment
- Uses `@sveltejs/adapter-vercel` for SSR + Edge Functions
- Server-side API routes in `src/routes/api/`
- Environment variables injected at build time (see `vite.config.js` define block)
- `/api/transcribe` endpoint for server-side Whisper API calls

### Mobile-First Responsive Design
- Tailwind mobile-first breakpoints (sm/md/lg/xl)
- Touch-friendly tap targets (min 44x44px)
- `--host` flag in dev server for mobile testing on network
- BottomNav on mobile, Sidebar on desktop

### Accessibility Standards
- WCAG 2.1 AA compliance target
- Color contrast checker: `npm run test:contrast`
- Semantic HTML (nav, main, article, section)
- Keyboard navigation support
- ARIA labels on all interactive elements
- Focus management for modals and forms

## Common Pitfalls

1. **Tokens not building** - Always run `npm run tokens:build` before first dev/build
2. **API 401 errors** - Check `PUBLIC_API_KEY` is set correctly
3. **Voice recording fails** - Ensure HTTPS (required for MediaRecorder) or localhost
4. **CORS errors on transcription** - Use `/api/transcribe` endpoint, not direct API calls
5. **Layout shifts** - Use proper aspect ratios and skeleton loading states
6. **Offline mode not working** - Check service worker registration in browser DevTools

## Project Status & Roadmap

**Completed (Phase 0-1):**
- ✅ VNext Design System with Style Dictionary
- ✅ Component library (primitives + composite)
- ✅ Home dashboard with 4-card layout
- ✅ Quick capture interface
- ✅ Obsidian API integration
- ✅ Voice recording + transcription
- ✅ Vault browser with folder tree
- ✅ Testing infrastructure (Vitest + Storybook)
- ✅ Vercel deployment with SSR

**Current Focus (Phase 1-2):**
- Vault note editor improvements
- Workflow system refinement
- Offline sync capabilities
- Performance optimization

**Future Enhancements:**
- AI-powered note classification
- Smart tagging and linking
- Advanced search and filtering
- Calendar/timeline integrations
- Collaboration features
