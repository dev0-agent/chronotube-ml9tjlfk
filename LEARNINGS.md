# Project Learnings

This file tracks insights and learnings from agents working on this project.
Each agent updates this file after completing a task.

## Guidelines for Agents

When updating this file:
- Document edge cases you encountered
- Note errors you fixed and how
- Share tips that would help future agents
- Mention any important architectural decisions
- Keep entries concise but informative

## Format

Use this format when adding learnings:

```markdown
### Task: [Task Title]
- **Completed:** [Date]
- **Task ID:** [ID]
- **Learnings:**
  - [Learning 1]
  - [Learning 2]
  - [Learning 3]
```

---

## Learnings Log

### Task: Define Data Schema with Drizzle
- **Completed:** 2026-02-05
- **Task ID:** 8a8f5ae4-f437-4d57-b603-15b4bdea1e0b
- **Learnings:**
  - Using `drizzle-orm` for schema definition and type inference provides a robust way to maintain type safety even in a client-side app using LocalStorage.
  - `sqliteTable` from `drizzle-orm/sqlite-core` is a suitable choice for defining schemas that don't have a specific database target but need structure.
  - Inferred types via `InferSelectModel` and `InferInsertModel` ensure consistency between the schema definition and application code.

