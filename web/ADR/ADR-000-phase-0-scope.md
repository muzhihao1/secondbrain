# ADR-000: Phase 0 Scope and Strategy

**Status**: Accepted
**Date**: 2025-10-27
**Deciders**: Frontend Team

## Context

We are implementing a comprehensive frontend refactor for the Obsidian Knowledge Vault PWA. Phase 0 focuses on establishing the foundational infrastructure: Design Tokens, component library, and tooling.

## Decision

### Scope (Week 1-2)

**In Scope**:
- Design Tokens system (Style Dictionary)
- TailwindCSS preset with `v` namespace
- Storybook 8 setup with theme switching
- 16 base primitive components
- A11y contrast checking automation
- Performance baseline (Lighthouse)

**Out of Scope (Phase 0)**:
- Complex interactive components (DatePicker, RichText Editor)
- Internationalization (i18n) and RTL
- Full application theme switch (only in Storybook)

### Key Technical Decisions

#### 1. Design Tokens Tool: Style Dictionary

**Alternatives Considered**:
- Theo (outdated)
- Pure Tailwind theme (limited flexibility)
- Token Studio export (manual process)

**Chosen**: Style Dictionary
- **Pros**: Mature ecosystem, multi-platform output, extensible formatters
- **Cons**: Requires custom formatter for Tailwind preset (acceptable)

#### 2. Naming Strategy

**Namespace**: `v` prefix for all new utilities
- Example: `bg-v-surface`, `text-v-primary`
- **Rationale**: Avoid conflicts with existing Tailwind classes

**Theme Attribute**: `data-theme="vnext-dark"`
- Applied to `:root` element
- Allows future theme variations

#### 3. Tailwind Integration Strategy

**Approach**: Preset + Namespace (gradual adoption)

```javascript
// tailwind.preset.cjs
module.exports = {
  theme: {
    extend: {
      colors: {
        v: {
          bg: 'var(--v-color-bg)',
          surface: 'var(--v-color-surface)',
          primary: 'var(--v-color-primary)',
          // ...
        }
      }
    }
  }
}
```

**Integration**:
- Phase 0: Only used in Storybook
- Phase 1+: Gradually adopted in main app
- Existing `tailwind.config.js` unchanged

#### 4. Isolation Strategy

**Principle**: Zero impact on existing functionality

**Implementation**:
- New tokens CSS scoped to `[data-theme="vnext-dark"]`
- Components only rendered in Storybook or `/vnext/*` routes
- Existing routes and components untouched

### Directory Structure

```
web/
├── tokens/
│   ├── src/
│   │   ├── core/           # color.json, spacing.json, etc.
│   │   ├── semantic/       # semantic mappings
│   │   └── themes/         # vnext-dark.json
│   └── style-dictionary.config.cjs
├── src/lib/
│   ├── styles/
│   │   └── tokens.css      # Generated CSS variables
│   ├── tokens/
│   │   └── index.ts        # Generated TS constants
│   └── components/
│       └── primitives/     # 16 base components
├── scripts/
│   ├── fonts/              # Font subsetting
│   ├── a11y/               # Contrast checking
│   └── perf/               # Lighthouse CI
└── ADR/                    # Architecture decisions
```

### Success Criteria (Phase 0 Exit)

- [ ] Design Tokens generate CSS variables + TS + Tailwind preset
- [ ] Storybook running with theme toggle
- [ ] 16 primitives implemented with a11y passing
- [ ] Contrast checker reports >= WCAG AA
- [ ] Lighthouse baseline recorded
- [ ] No impact on existing app (verified by visual regression)

## Consequences

### Positive

- **Gradual adoption**: No big-bang changes, low risk
- **Strong foundation**: Systematic approach to design system
- **Future-proof**: Easy to extend themes and components
- **Observable**: Clear metrics for progress

### Negative

- **Initial overhead**: Setting up tooling takes time
- **Dual maintenance**: Temporarily maintaining old and new systems
- **Learning curve**: Team needs to understand new token system

### Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Token naming conflicts | Use `v` namespace, document clearly |
| Storybook build breaks main app | Keep separate build pipelines |
| Performance regression | Monitor bundle size, lazy load Storybook |
| Team resistance | Provide clear migration guides, show benefits early |

## References

- [Main Refactor Plan](/docs/FRONTEND_REFACTOR_MASTER_PLAN.md)
- [Original Evaluation](/Obsidian 知识库前端界面全面评估与重构方案.md)
- [Card Design Philosophy](/核心理念_ "聚合信息,聚焦行动"——卡片式布局重塑您的知识工作流.md)
- [Style Dictionary Docs](https://amzn.github.io/style-dictionary/)

## Notes

This ADR defines the **strategic boundaries** for Phase 0. All subsequent implementation tasks must align with these decisions. Deviations require explicit discussion and a new ADR.
