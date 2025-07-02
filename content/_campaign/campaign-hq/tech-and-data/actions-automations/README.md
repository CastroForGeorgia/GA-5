# 🤖 GitHub Actions & Automations

This folder contains custom GitHub Actions, scripts, and reusable workflows that help run the campaign more efficiently, transparently, and inclusively.

We use automations to reduce manual work and create consistent, low-barrier participation—especially for first-time contributors.

---

## 🚀 What We Automate

| Task | Description |
|------|-------------|
| 🧾 Weekly Digest Bot | Auto-compile new PRs, Issues, and commits into a weekly markdown |
| 🏷️ Labeling | Add labels based on keywords (e.g. `yard-sign`, `housing`, `intro`) |
| 🛠️ Linting / Formatting | Check spelling and Markdown style on PRs |
| 📣 Welcome Bot | Greets new contributors in Introductions Discussion |
| 🔁 Policy Sync | When a draft is moved to `final/`, mirror it to `docs/policy` or GitHub Pages |
| ✅ Issue Templates | Enforce structure in PRs and volunteer tasks |

---

## 📁 Folder Layout

```text
actions-automations/
├─ workflows/
│   ├─ weekly-digest.yml
│   ├─ labeler.yml
│   ├─ pr-linter.yml
│   └─ policy-sync.yml
├─ scripts/
│   ├─ build_digest.py
│   ├─ mirror_policy.sh
│   └─ welcome_intro.js
└─ templates/
    └─ issue_comment_welcome.md
````

---

## ⚙️ How to Add an Automation

1. Create or modify a file under `workflows/`
2. If needed, add custom scripts under `scripts/`
3. Test with a separate branch and fake PR or Issue
4. Open a PR and tag `@tech-leads` for review

---

## 🛡️ Rules for Responsible Automation

* Never modify or delete user content (just comment or tag)
* Always test in a branch or staging repo first
* Limit spammy behavior—Actions should add clarity, not noise
* Avoid hardcoding contributor handles or IDs

---

## 🧪 Ideas for New Automations

* Auto-close stale Issues with no replies
* Slack/Discord webhook for field updates
* Auto-translate Issues or PR comments (with opt-out)
* Nightly backup of final policies → CSV snapshot

---

## 🧠 GitHub Actions Resources

* [Actions Documentation](https://docs.github.com/en/actions)
* [Reusable Workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
* [Context & Expressions](https://docs.github.com/en/actions/learn-github-actions/contexts)

---

**We automate to empower—not replace—the work of people.**