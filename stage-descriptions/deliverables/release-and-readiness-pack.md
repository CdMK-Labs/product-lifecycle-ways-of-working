## What this pack is for

The Release & Readiness Pack supports safe release, controlled rollout and a smooth move into live operation. It brings the most important release and readiness information together in one place so the team and stakeholders can see whether the change is genuinely ready to release, support and use.

It is not only a technical deployment checklist. A good Release & Readiness Pack helps reduce avoidable instability, improves coordination at go-live and makes the move into normal operation cleaner.

## What's in this pack

#### [Release & Readiness Pack template](supporting-materials/release-and-readiness-pack/)
Your working document for coordinating deployment, rollout, support readiness, user preparation and go-live decision-making.

Supporting materials that can be linked from the pack:
- deployment checklists
- rollout plans
- support readiness checklists
- monitoring and alert setup
- runbooks and support notes
- communication and training material
- rollback plans
- go-live issue logs

## When to use this pack

Use this pack during [Deploy](stage.html?s=deploy).

The trigger is typically:
- the relevant changes are ready to move toward production
- quality, security and non-functional checks have reached the level needed for go-live
- support, monitoring and operational readiness need to be confirmed
- rollout, communication and training activities need to be coordinated
- the team needs a clear basis for the go-live decision

For larger deliveries, the pack may support formal go-live checkpoints and coordinated release governance. For smaller changes, it can be used in a lighter way to confirm that deployment, support and user readiness have been handled responsibly.

The pack should be prepared ahead of release and kept current as readiness evolves.

## Minimum viable starting point

A release summary, a clear deployment and rollout plan, a confirmed support and monitoring setup, and a go-live decision statement is enough to proceed for most changes.

Complete the remaining sections at the level the change requires. A small internal update may need only a brief readiness checklist and a short support note. A larger rollout needs all sections in full, including rollback thinking and communication actions.

## Pack contents

The pack should stay practical and action-oriented. It should make release readiness visible, not become a full technical runbook.

### 1. Release summary
What is being released, why it matters and what the release is expected to achieve.

### 2. Deployment plan
How the release will happen: deployment pipelines, automation, manual controls or coordinated release steps where relevant. Main release flow, key responsibilities and approval or control points.

### 3. Rollout plan
How the change will be introduced to the relevant users, teams, markets or functions. Rollout sequencing and scope where relevant.

### 4. Readiness checklist
The most important readiness points that must be confirmed before go-live. Helps the team and stakeholders judge whether the change is truly ready.

### 5. Support setup
Who will support the product at and after go-live, how support is organized and where issues should go. Important for early live stability.

### 6. Monitoring and alert readiness
The monitoring, alerting and operational visibility that will be in place from day one. Helps ensure the team can see and respond to issues quickly after release.

### 7. Access and permissions readiness
Whether the relevant users, roles, teams or support functions will have the access needed at go-live.

### 8. Runbooks and support notes
The operational notes, runbooks or support guidance that exist to help with live use and issue handling. Link to the underlying material where relevant.

### 9. Communication and training actions
What is being communicated, who needs to be informed, and what training or guidance is in place.

### 10. Rollback and contingency plan
What will happen if the release does not work as expected. Should make major release-risk responses visible without becoming overly detailed in the main pack.

### 11. Go-live issues and actions
The most important known issues, immediate post-go-live actions and stabilisation items.

### 12. Go-live confirmation or decision
Whether the release is approved to proceed, has gone live, is live with conditions, or needs delay, rework or rollback.

### 13. Owner and contributors
The people responsible for the pack and the main contributors involved.

## Who is typically involved

**IT Delivery Lead** — usually leads the coordination of the pack and keeps release activities, dependencies and readiness actions visible.

**Product Owner** — ensures business-facing readiness, rollout needs and immediate post-go-live priorities are clear.

**Head of Product** — helps balance go-live ambition with product responsibility and supports final readiness decisions.

**IT Specialists / Developers** — contribute technical deployment input, configuration readiness and validation outcomes.

**Adoption Specialist** — contributes communication, training, user readiness and support planning where relevant.

**Product Architect** — helps ensure non-functional readiness, technical integrity and architectural considerations are understood at go-live.

**Others who may contribute:** Support roles, business stakeholders, super users, vendors, dependent teams.

## What good looks like

A good Release & Readiness Pack is clear, practical and confidence-building. It:
- makes the release scope and go-live path easy to understand
- shows that technical deployment, support and monitoring have been prepared
- makes user and stakeholder readiness visible where relevant
- surfaces known risks and contingency actions clearly
- supports a controlled move into normal operation rather than a rushed handoff
- makes good use of automated testing, deployment pipelines and repeatable controls where the product context supports it

A strong pack helps the team go live with discipline and gives stakeholders confidence that the change is ready to be used and supported.

## Common pitfalls

**Treating release as only a technical deployment**

A good release also depends on rollout, support readiness, communication and user preparation.

**Going live without clear operational readiness**

If support setup, monitoring, access or runbooks are weak, avoidable instability is created from day one.

**Leaving adoption activities too late**

Users and stakeholders often need communication, guidance or training before the release happens, not after.

**Assuming live means finished**

Known issues, stabilisation needs and immediate follow-up should still be visible after go-live.

**Unclear ownership during go-live**

If responsibilities are blurred, issue handling and coordination become weaker when pressure is highest.

## Related stages

Most closely linked to [Deploy](stage.html?s=deploy).

Builds on [Develop & Deliver](stage.html?s=develop-and-deliver). Leads into [Operate & Monitor](stage.html?s=operate-and-monitor) and [Measure & Learn](stage.html?s=measure-and-learn).
