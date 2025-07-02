---
layout: welcome-hub-page
title: "Event Organizing Guide | Andres Castro Campaign"
description: "Learn to organize community events, town halls, canvass kickoffs, and more. Build connections and mobilize your neighborhood through effective grassroots organizing."
permalink: /campaign/welcome-hub/get-involved/events-organizing/
---

# 📅 Event Organizing Guide

Events are where our campaign truly comes to life — at community centers, church basements, neighborhood parks, and on porches across GA‑05. This guide walks you through organizing public events using our open-source structure on GitHub.

Whether you're hosting a neighborhood meetup, town hall, mutual aid drive, or volunteer training, this guide has you covered.

---

## 🌟 What Counts as a Campaign Event?

* **Canvass kickoffs**
* **House meetings**
* **Flyer handouts at transit stops**
* **Public forums / town halls**
* **Community cleanups or mutual aid efforts**
* **Policy roundtables or workshops**
* **Online Q\&As, Zoom teach-ins, livestreams**

If it builds connection and moves people to act — it's an event.

---

## 📍 Where to Organize Events in the Repo

All events are coordinated in:

```
campaign/
├─ neighborhoods/
│   └─ [your-neighborhood]/
│       └─ field-ops/
│           └─ events/        ← Event folders (each with plan, notes, flyers)
├─ campaign-hq/
│   └─ announcements/
│       └─ events-schedule.md
```

Each event folder includes:

* `README.md` (event plan)
* `flyers/` (PDFs, PNGs, Canva links)
* `materials-needed.md`
* `photos/` (post-event)

---

## 🚀 Getting Started (Step-by-Step)

### Step 1: Propose Your Event

Open a **GitHub Issue** using the **Event Planning** template (coming soon), or use this format:

```md
**Title**: West End Community Meetup  
**Date**: July 20, 2025  
**Location**: West End Library  
**Type**: In-person  
**Needs**: Flyers, chairs, 2 speakers  
**Labels**: `event`, `west_end`
```

### Step 2: Create Your Event Folder

Once approved by a Neighborhood Lead or Campaign HQ:

```bash
/neighborhoods/west_end/field-ops/events/west-end-library-meetup-072025/
```

Add a `README.md` with your event plan:

* Goals
* Speakers
* Volunteer roles
* Timeline

---

## 📋 Event Checklist Template

Use this list to plan your event:

* [ ] Location secured
* [ ] Date/time confirmed
* [ ] Promotion flyer ready
* [ ] Event shared on social media & email
* [ ] Volunteers recruited (sign-in, food, cleanup)
* [ ] Photos/video planned
* [ ] Post-event notes written

---

## 🧰 GitHub Features for Event Organizers

| Tool               | Use                                                              |
| ------------------ | ---------------------------------------------------------------- |
| **Issues**         | Propose and track events (log needs, updates)                    |
| **Labels**         | Tag events by neighborhood (`oakland_city`, `mutual_aid`, etc.)  |
| **Pull Requests**  | Submit flyers, notes, and changes to event plans                 |
| **Project Boards** | Track event prep steps visually                                  |
| **Discussions**    | Brainstorm event ideas or troubleshoot                           |
| **GitHub Mobile**  | Use your phone to upload photos or check task lists in the field |

---

## 📷 Sharing Your Event

After the event:

1. Upload any flyers or materials to the event folder.
2. Add post-event notes (attendance, wins, what worked).
3. Drop photos in `photos/`, or link to cloud folder.
4. Open an Issue or PR to share highlights with the campaign (label: `event-report`).

---

## 📣 Promoting the Event

* Submit flyer to `design-assets/` and open an Issue tagged `design`.
* Post in Discussions to encourage volunteers.
* Request signal boosting from comms team using Issue label `amplify`.

---

## 🧑‍🤝‍🧑 Roles You'll Need

| Role                    | Responsibility                      |
| ----------------------- | ----------------------------------- |
| Event Lead              | Main planner and coordinator        |
| Volunteer Coordinator   | Handles sign-in, assignments        |
| Host / Emcee            | Welcomes folks, introduces speakers |
| Photographer / Recorder | Captures the event (with consent!)  |
| Logistics / Setup       | Chairs, water, cleanup, etc.        |

Use GitHub Issues to assign or request these roles in advance.

---

## 🙋 FAQs for Event Organizers

**"Can I plan an event on my own?"**
Yes! But post it in advance for safety, support, and transparency.

**"Can someone help me run it?"**
Absolutely. Request co-leads in an Issue or Discussion.

**"What if I don't know how to use GitHub?"**
Use our [Quick Start Guide](../get-involved/quick-start-guide.md), or email your event details and a team member will help set it up.

---

## 📞 Need Help?

* Ask for feedback in the [Help Desk Discussion](https://github.com/CastroForGeorgia/campaign/discussions/categories/help-desk).
* Join office hours for hands-on support from the organizing team.

---

## 🚦 Ready to Start Organizing?

* Open a [New Issue](https://github.com/CastroForGeorgia/campaign/issues/new) to propose your event.
* Check out past events for inspiration in `field-ops/events/`.
* Coordinate with your neighborhood team and start planning!

Thank you for building power where it matters most: right in your own community.