---
title: "Scrum Methodology Guidelines"
meta_title: "Scrum Methodology Guidelines"
description: "this is meta description"
date: 2025-01-17T11:43:32-06:00
image: "/images/posts/software-development/image.png"
categories: ["Software development"]
author: "Daniel Pichardo"
tags: ["scrum", "team-topologies"]
draft: false
---


**Scrum** is an **agile framework** for developing, delivering, and sustaining complex products. It emphasizes **empirical process control**, **collaboration**, **accountability**, and **iterative progress**. Scrum divides work into **Sprints**—time-boxed iterations—where teams produce potentially shippable product increments.

Scrum is based on three pillars:

- **Transparency**
- **Inspection**
- **Adaptation**

And five core values:

- **Commitment, Courage, Focus, Openness, Respect**

---

## Scrum Roles and Responsibilities

| Role             | Responsibilities                                                                 |
|------------------|----------------------------------------------------------------------------------|
| **Product Owner** | Owns the **Product Backlog**, sets priorities, ensures the team builds value     |
| **Scrum Master**  | Facilitates Scrum events, removes impediments, ensures adherence to Scrum        |
| **Development Team** | Cross-functional team responsible for delivering a potentially releasable increment |

---

## Scrum Events and Time Allocations

| Event                 | Purpose                                                        | Duration (for 2-week sprint)         |
|-----------------------|----------------------------------------------------------------|--------------------------------------|
| **Sprint**            | Time-boxed development cycle producing a product increment     | 1–4 weeks (commonly 2 weeks)         |
| **Sprint Planning**   | Define Sprint Goal and Sprint Backlog                          | 2–4 hours                            |
| **Daily Scrum**       | Sync on progress, plan the next 24 hours                       | 15 minutes (same time & place daily) |
| **Sprint Review**     | Review the Increment with stakeholders                         | 1–2 hours                            |
| **Sprint Retrospective** | Reflect and improve team process                             | 1–1.5 hours                          |
| **Backlog Refinement**| Groom and clarify upcoming work items                          | Ongoing, ~10% of sprint time         |

---

## Scrum Artifacts

| Artifact           | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| **Product Backlog** | Ordered list of everything that might be needed in the product              |
| **Sprint Backlog**  | Selected Product Backlog items plus a plan for delivering the Increment     |
| **Increment**       | Sum of all completed Product Backlog items during a Sprint (shippable)     |
| **Definition of Done (DoD)** | Shared understanding of what it means for work to be complete        |

---

## Best Practices

### Product Owner
- Prioritize items based on **business value** and **risk**
- Maintain a **well-groomed backlog**
- Collaborate frequently with stakeholders and team

### Scrum Master
- Enforce **time-boxing** and Scrum discipline
- Facilitate **collaboration and self-organization**
- Continuously work to **remove impediments**

### Development Team
- Aim for **technical excellence and continuous integration**
- Deliver **a potentially releasable increment** every Sprint
- Maintain **shared ownership of code and tasks**

---

## Recommended Practices

- Use **User Stories** with **Acceptance Criteria**
- Keep **WIP (Work in Progress)** low
- Adopt **test-driven development (TDD)** or **behavior-driven development (BDD)**
- Use **Burndown/Burnup Charts** and **Velocity Tracking**
- Conduct **story point estimation** using **Planning Poker**
- Maintain a visible **Definition of Done**
- Encourage **pair programming** and **peer code reviews**
- Use tools like **Jira, Trello, Azure DevOps, or Rally**

---

## Team Configuration & Topology

### Optimal Scrum Team Size
- **5 to 9 members** (excluding Product Owner and Scrum Master)
- Small enough to stay nimble, large enough to complete significant work

### Recommended Team Topologies

1. **Feature Teams**
   - Cross-functional teams that deliver end-to-end customer value
   - Encourage ownership and reduce dependencies

2. **Component Teams** (less preferred in Scrum)
   - Organized by technical layer (backend, frontend, etc.)
   - Suitable for very large or legacy systems

3. **Stream-Aligned Teams** (from Team Topologies model)
   - Aligned to a flow of work from a segment of the business domain
   - May use enabling/support teams

### Cross-Functionality
- Teams must include all necessary skills (design, development, QA, DevOps, etc.)

---

## Common Pitfalls to Avoid

- Skipping Retrospectives or turning them into complaint sessions
- Sprint Planning becoming a waterfall-style Gantt chart
- Lack of stakeholder involvement in Sprint Reviews
- Incomplete or vague Definition of Done
- Overcommitting to Sprint work
- Not adapting based on Retrospective insights
- Not allowing the team autonomy in selecting Sprint backlog items

---

## Metrics to Track

- **Sprint Burndown**
- **Velocity**
- **Cycle Time**
- **Lead Time**
- **Escaped Defects**
- **Team Happiness Index**
- **Commitment Reliability**
