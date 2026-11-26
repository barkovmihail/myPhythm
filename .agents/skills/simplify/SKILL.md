---
name: simplify
description: Simplify recently changed code after implementation. Use when the user requests a cleanup pass over a diff, optionally focused on reuse, readability, or efficiency. Apply behavior-preserving fixes and verify the changes.
---

# Simplify recent changes

Use the diff or files the user identified. Otherwise inspect staged and unstaged changes with Git, including relevant new files listed by git status. If the working tree is clean, use changes identified by the current task or ask which commit to review. Outside Git, use recently edited files associated with the task.

Read applicable AGENTS.md instructions and enough surrounding code to understand the change. Give any requested focus area priority. Review the same diff from three perspectives, using independent reviewers in parallel when delegation is available and permitted. Otherwise perform the three passes directly.

- **Reuse.** Look for duplicated behavior and existing helpers or components that already implement the required semantics. Check their callers before consolidating.
- **Readability.** Look for naming, nesting, redundant state, or abstractions that obscure the changed logic. Follow the project's conventions.
- **Efficiency.** Trace changed execution paths for repeated computation, I/O, queries, or rendering. Check ordering and error handling before batching work.

Combine overlapping findings, discard speculative ones, and apply worthwhile fixes within the reviewed changes. Preserve behavior and other work in progress. If the user asked only for findings, report them without editing. Inspect the resulting diff, run checks relevant to the edits, and summarize what changed and what was verified. If the code is already clear and efficient, say so.

Adapted for Codex from the [community description of Claude Code's simplify workflow](https://github.com/noelzappy/claude-code-system-prompts/blob/main/prompts/19_simplify_skill.md).
