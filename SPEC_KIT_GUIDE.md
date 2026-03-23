# Spec Kit Usage Guide for Roméga Solutions

> A simple, practical guide to using Spec Kit for structured feature development

## What is Spec Kit?

Spec Kit is a **workflow tool** that helps you build features systematically instead of winging it. Think of it as a recipe for coding:
- 📝 First, describe **what** you want
- 🗺️ Then, plan **how** to build it
- ✅ Break it into **tasks**
- 🚀 Execute the **implementation**

## Where to Use Commands

⚠️ **IMPORTANT**: All `/speckit.*` commands are used in **GitHub Copilot Chat** in VS Code, NOT in the terminal!

**How to open Copilot Chat:**
- Press `Ctrl+Shift+I` (Windows) or `Cmd+Shift+I` (Mac)
- Or click the chat icon in the VS Code sidebar

## Setup (One-Time Per Project)

### ✅ Already Done in This Project:
- [x] Installed Spec Kit CLI globally
- [x] Initialized Spec Kit in repository (`.github/agents/` and `.specify/` folders)
- [x] Created project constitution (`.specify/memory/constitution.md`)

You're ready to build features! 🎉

---

## Feature Development Workflow

Use this workflow **every time** you want to build a new feature:

### Step 1: Specify (What do you want?)

**Command:** `/speckit.specify`

**What it does:** Describes the feature in plain English - what it should do and why.

**Example:**
```
/speckit.specify Add a "Join Our Talent Pool" call-to-action section to the talent page. 

The CTA should:
- Appear prominently when the talent pool is empty
- Include a compelling headline like "Are you a talented professional?"
- Include a description encouraging professionals to apply
- Have a button that opens the contact form
- Match the existing design system (colors, fonts, spacing)
- Be responsive on mobile, tablet, and desktop
- Include an icon or illustration
```

**Output:** Creates `.specify/memory/features/[feature-name]/spec.md`

---

### Step 2: Plan (How will you build it?)

**Command:** `/speckit.plan`

**What it does:** Creates a technical plan with your chosen tech stack and architecture.

**Example:**
```
/speckit.plan 

Use the following approach:
- Create a new component: TalentPoolEmptyCTA.tsx in components/organisms/talent/
- Use existing Button component from atoms/
- Follow BEM CSS methodology with TalentPoolEmptyCTA.module.css
- Use existing CSS variables for colors (--rs-accent-600, --rs-neutral-100, etc.)
- Add UserPlus icon from lucide-react
- Integrate into existing TalentPool component
- No new npm dependencies needed
- Make it keyboard accessible and screen-reader friendly
```

**Output:** Creates `.specify/memory/features/[feature-name]/plan.md`

---

### Step 3: Tasks (Break it down)

**Command:** `/speckit.tasks`

**What it does:** Breaks the plan into small, actionable tasks (like a checklist).

**Example:**
```
/speckit.tasks
```

**Output:** Creates `.specify/memory/features/[feature-name]/tasks.md` with something like:
- [ ] Create TalentPoolEmptyCTA component file
- [ ] Create TalentPoolEmptyCTA CSS module
- [ ] Add headline and description text
- [ ] Add button with icon
- [ ] Integrate into TalentPool component
- [ ] Add responsive styles
- [ ] Test on mobile/tablet/desktop
- [ ] Run linter and fix any issues

---

### Step 4: Implement (Build it!)

**Command:** `/speckit.implement`

**What it does:** Executes all the tasks and builds the feature according to your plan.

**Example:**
```
/speckit.implement
```

**What happens:**
1. Copilot reads your constitution, spec, plan, and tasks
2. Creates/modifies files one by one
3. Follows all your project rules (TypeScript, BEM, accessibility, etc.)
4. Runs tests and linters
5. Shows you what it did

---

## Optional Enhancement Commands

These are **optional** - use them if you want extra quality checks:

### `/speckit.clarify`
**When to use:** After `/speckit.specify`, before `/speckit.plan`  
**What it does:** Asks you questions about unclear parts of your spec

**Example:**
```
/speckit.clarify
```

Copilot might ask:
- "What should happen when the user clicks the button?"
- "Should the CTA have a background color or be transparent?"
- "Where exactly on the page should this appear?"

---

### `/speckit.analyze`
**When to use:** After `/speckit.tasks`, before `/speckit.implement`  
**What it does:** Checks if your spec, plan, and tasks are consistent with each other

**Example:**
```
/speckit.analyze
```

It might find issues like:
- "Plan mentions a modal but spec doesn't describe modal behavior"
- "Tasks don't include writing tests mentioned in the plan"

---

### `/speckit.checklist`
**When to use:** After `/speckit.plan`  
**What it does:** Creates a quality checklist to validate your requirements

**Example:**
```
/speckit.checklist
```

Creates checks like:
- [ ] All interactive elements have ARIA labels
- [ ] Component uses existing design tokens
- [ ] Performance impact is documented

---

## Complete Example Workflow

Here's a full example of building a feature:

### Feature: "Join Talent Pool" CTA Button

**1. Open Copilot Chat in VS Code** (`Ctrl+Shift+I`)

**2. Specify:**
```
/speckit.specify Add a "Join Our Talent Pool" CTA button prominently displayed on the talent page when no talents are available. Button should be large, attention-grabbing, and open the contact form when clicked.
```

**3. Plan:**
```
/speckit.plan 
- Create new component TalentPoolEmptyCTA
- Use existing Button atom component
- Add to TalentPool when talents array is empty
- Style with existing design tokens
- No new dependencies
```

**4. Tasks:**
```
/speckit.tasks
```

**5. Implement:**
```
/speckit.implement
```

**6. Review the changes, test, and commit!**

---

## Quick Reference Card

| Command | When | What |
|---------|------|------|
| `/speckit.constitution` | **Once per project** | Define project rules and principles |
| `/speckit.specify` | **Start of each feature** | Describe what you want to build |
| `/speckit.plan` | After specify | Decide how to build it technically |
| `/speckit.tasks` | After plan | Break down into small tasks |
| `/speckit.implement` | After tasks | Build the feature |
| `/speckit.clarify` | _(optional)_ After specify | Ask questions about unclear parts |
| `/speckit.analyze` | _(optional)_ After tasks | Check consistency |
| `/speckit.checklist` | _(optional)_ After plan | Generate quality checklist |

---

## Tips & Best Practices

### ✅ Do's
- **Be specific** in your `/speckit.specify` - describe exactly what you want
- **Reference existing code** in `/speckit.plan` - reuse components when possible
- **Run one feature at a time** - don't mix multiple features in one workflow
- **Review the output** after `/speckit.implement` - you're still the boss!
- **Test before committing** - run `npm run lint` and `npm test`

### ❌ Don'ts
- **Don't skip steps** - the workflow is designed to be followed in order
- **Don't use in terminal** - these are Copilot Chat commands, not bash commands
- **Don't automate blindly** - always review what Copilot creates
- **Don't forget the constitution** - it guides everything Copilot does

---

## Troubleshooting

### "Command not found"
**Problem:** You typed `/speckit.specify` in the terminal  
**Solution:** Open **Copilot Chat** in VS Code (`Ctrl+Shift+I`) and type it there

### "No constitution found"
**Problem:** Constitution file is missing  
**Solution:** Run `/speckit.constitution` first (already done in this project)

### "Feature files not created"
**Problem:** Spec Kit didn't create the expected files  
**Solution:** Check `.specify/memory/features/` folder - files should be there

### "Implementation doesn't follow rules"
**Problem:** Generated code doesn't match project standards  
**Solution:** Your constitution defines the rules - update it if needed, then re-run

---

## Real-World Examples

### Example 1: Add Dark Mode Toggle
```
/speckit.specify Add a dark mode toggle button in the header that switches between light and dark themes. Preserve user preference in localStorage.

/speckit.plan Use React Context for theme state, add toggle button in Header component, create CSS variables for both themes, use localStorage to persist preference.

/speckit.tasks

/speckit.implement
```

### Example 2: Build Contact Form Validation
```
/speckit.specify Add client-side validation to the contact form. Show error messages for invalid email, empty required fields, and phone number format. Show success message after submission.

/speckit.plan Use react-hook-form for validation, add Yup schema for rules, create ErrorMessage component, integrate with existing form.

/speckit.tasks

/speckit.implement
```

### Example 3: Create Talent Card Component
```
/speckit.specify Create a reusable talent card component that displays professional's photo, name, role, skills, availability, and rate. Should be clickable to view full profile.

/speckit.plan Follow Atomic Design - create TalentCard as organism, reuse existing Badge and Tag atoms, add to components/organisms/talent/, use BEM for styling.

/speckit.tasks

/speckit.implement
```

---

## Where Files Are Stored

```
.specify/
  ├── memory/
  │   ├── constitution.md              # Project rules (created once)
  │   └── features/
  │       ├── talent-pool-cta/         # Example feature
  │       │   ├── spec.md              # What to build
  │       │   ├── plan.md              # How to build it
  │       │   └── tasks.md             # Task breakdown
  │       └── another-feature/
  │           ├── spec.md
  │           ├── plan.md
  │           └── tasks.md
  ├── scripts/                         # Automation scripts
  └── templates/                       # Spec Kit templates

.github/
  └── agents/                          # Copilot slash command definitions
      ├── speckit.constitution.agent.md
      ├── speckit.specify.agent.md
      ├── speckit.plan.agent.md
      ├── speckit.tasks.agent.md
      └── speckit.implement.agent.md
```

---

## Summary

**Spec Kit = A structured way to build features without chaos**

1. 📝 **Specify** what you want (plain English)
2. 🗺️ **Plan** how to build it (technical decisions)
3. ✅ **Tasks** break it down (action items)
4. 🚀 **Implement** build it (code generation)

Use it **in Copilot Chat**, not the terminal. Use it for **every new feature**. Follow your **constitution** for project rules.

---

**Questions?** Check the official docs: https://github.com/github/spec-kit

**Ready to start?** Open Copilot Chat and type `/speckit.specify` to build your first feature! 🎯
