# AI Agent Workflows

> Log: This markdown file exists and is currently active.
> Last updated: 2026-05-10
>
> ```js
> console.log('ai-agents/workflows.md loaded')
> ```

This file describes recommended workflows for AI-assisted development.

## Common Workflow
1. Inspect the current project structure and existing files.
2. Identify the smallest safe change that solves the request.
3. Create or update files with clear naming and feature-based organization.
4. Run local validation (`npm run build`, lint, or tests) if available.
5. Summarize the result with file names and next steps.

## Feature Development
- Prefer feature folders like `src/features/<feature>/`.
- Keep store configuration under `src/app/`.
- Put reusable API clients in `src/api/`.

## Documentation Updates
- Keep docs in a dedicated folder when possible, such as `ai-agents/` or `docs/`.
- Use markdown files for agent conventions, templates, and project guidelines.

## When to Ask Clarifying Questions
- If the request is ambiguous.
- If there are multiple valid implementation patterns.
- If a user preference is needed for naming, style, or feature scope.
