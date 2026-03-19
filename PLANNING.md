# Commit Workflow Plan

This document outlines a planned workflow for this project, with carefully-planned atomic commits to follow Git best practices as directed by The Odin Project: [Commit Messages](https://www.theodinproject.com/lessons/foundations-commit-messages) lesson.

**Discovery:** best practices for git commit messages using below format:

```
<type>(<scope>): <short, imperative description>

[optional body: context, motivation, or reasoning]
```

## Commit Message Workflow Plan

**Commit 1:**  
docs(PSEUDOCODE): add initial architecture plan

**Commit 2:**  
docs(PSEUDOCODE): finalize game architecture

**Commit 3:**  
feat(script): translate game logic from pseudocode

Note: Logic is currently untested and requires refactoring

**Commit 4:**  
feat(script): complete full game implementation

**Commit 5:**  
feat(homepage): add project desc to home page

**Commit 6:**  
docs(README): update README with project details

**Commit 7:**  
docs(PLANNING): upload commit planning doc

### Add GUI Features & DOM Logic

**Commit 8:**
feat: initial GUI implementation exploration

Functional, but needs refactor and cleanup

(I wound up doing it this way because I had no idea where to start and I decided to hack away at it until I got something working)

**Commit 9:**
refactor: clean up UI struct and finalize game logic

- Remove abandoned 'crt-screen' div to simplify DOM structure.
- Refactor choice button disabling logic
- Update choice button hover states for disabled buttons.
- Create determineGameWinner to separate concerns from displayGameWinner.
- Implement Template Literals for scoreboard and arena text updates.
- Create MAX-ROUNDS constant instead of hard-coding the rounds into the logic.
