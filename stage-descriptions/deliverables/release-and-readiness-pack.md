## What this deliverable is for

The Release & Readiness Pack is the deliverable used to support safe release, controlled rollout and a smooth move into live operation.

Its purpose is to bring the most important release and readiness information together in one place: what is being released, how it will be deployed and rolled out, what is in place to support stable operations from day one, how users and stakeholders are being prepared where relevant, and what needs special attention during and after release.

The Release & Readiness Pack is not only a technical deployment checklist. It should help the team and stakeholders see whether the change is genuinely ready for release, support and use.

A good Release & Readiness Pack helps reduce avoidable instability, improves coordination at release, and makes it easier to move into normal live operation with confidence.

The release approach may vary depending on the product context. Some products will rely on more coordinated go-live events, while others may move toward more frequent release through automated testing, deployment pipelines and repeatable controls. In both cases, the purpose of the deliverable is the same: to make release readiness visible and ensure the product can be released safely and supported properly.

The Release & Readiness Pack should be prepared ahead of release and kept current as readiness evolves. It should be reviewed at the checkpoints that matter for release decisions, rollout coordination and early stabilisation.

## When to use it

Use this deliverable in [Deploy](stage.html?s=deploy).

It should be used when:
- the relevant changes are ready to move toward production
- quality, security and non-functional checks have reached the level needed for go-live
- support, monitoring and operational readiness need to be confirmed
- rollout, communication and training activities need to be coordinated
- the team needs a clear basis for go-live decision-making and early stabilisation

For larger deliveries, the Release & Readiness Pack may support formal go-live checkpoints and coordinated release governance.

For smaller product changes, it can still be used in a lighter way to confirm that deployment, support and user readiness have been handled responsibly.

## Who is typically involved

### IT Delivery Lead
Usually leads the shaping and coordination of the Release & Readiness Pack and helps keep release activities, dependencies and readiness actions visible.

### Product Owner
Helps ensure business-facing readiness, rollout needs and immediate post-go-live priorities are clear.

### Head of Product
Helps balance go-live ambition with product responsibility and supports final readiness decisions.

### IT Specialists / Developers
Contribute technical deployment input, configuration readiness, validation outcomes and immediate go-live support.

### Adoption Specialist
Contributes communication, training, user readiness and support planning where relevant.

### Product Architect
Helps ensure non-functional readiness, technical integrity and architectural considerations are understood at go-live.

**Others who may contribute:** Support roles, business stakeholders, super users, vendors, dependent teams, Product Manager where rollout or value realization implications need visibility.

## Minimum contents

The Release & Readiness Pack should show whether the change is ready to be released and supported in live use. It should stay practical and action-oriented.

### 1. Release summary
A short summary of what is being released, why it matters and what the release is expected to achieve.

This section should make the release context easy to understand.

### 2. Deployment plan
A clear view of how the release will happen, including the use of deployment pipelines, automation, manual controls or coordinated release steps where relevant.

This should include the main release flow, key responsibilities and any important approval or control points needed for safe deployment.

### 3. Rollout plan
A short description of how the change will be introduced to the relevant users, teams, markets or functions.

This section should make rollout sequencing and scope visible where relevant.

### 4. Readiness checklist
A view of the most important readiness points that must be confirmed before go-live.

This should help the team and stakeholders judge whether the change is truly ready.

### 5. Support setup
A short description of who will support the product at and after go-live, how support is organized, and where issues should go.

This section is important for early live stability.

### 6. Monitoring and alert readiness
A summary of the monitoring, alerting and operational visibility that will be in place from day one.

This section should help ensure the team can see and respond to issues quickly after release.

### 7. Access and permissions readiness
A view of whether the relevant users, roles, teams or support functions will have the access needed at go-live.

This section should reduce avoidable friction and support issues.

### 8. Runbooks and support notes
A short summary of the operational notes, runbooks or support guidance that exist to help with live use and issue handling.

This should link to the underlying material where relevant.

### 9. Communication and training actions
A summary of what is being communicated, who needs to be informed, and what training or guidance is in place.

This section should make user and stakeholder readiness visible.

### 10. Rollback and contingency plan
A short description of what will happen if the release does not work as expected.

This should make major release-risk responses visible without becoming overly detailed in the main pack.

### 11. Go-live issues and actions
A view of the most important known issues, immediate post-go-live actions and stabilisation items.

This section should support controlled follow-up rather than assuming that live means finished.

### 12. Go-live confirmation or decision
A clear statement of whether the release is approved to proceed, has gone live, is live with conditions, or needs delay, rework or rollback.

The reader should never be left unsure about go-live status.

### 13. Owner and contributors
The people responsible for the pack and the main contributors involved.

## What good looks like

A good Release & Readiness Pack is clear, practical and confidence-building.

It should:
- make the release scope and go-live path easy to understand
- show that technical deployment, support and monitoring have been prepared
- make user and stakeholder readiness visible where relevant
- surface known risks and contingency actions clearly
- help the team coordinate effectively during release
- support a controlled move into normal operation rather than a rushed handoff
- make early stabilisation and follow-up easier after release
- make good use of automated testing, deployment pipelines and repeatable controls where the product context supports it

A strong Release & Readiness Pack helps the team go live with discipline and gives stakeholders confidence that the release is ready to be used and supported.

## Common pitfalls

**Treating release as only a technical deployment**

A good release also depends on rollout, support readiness, communication and user preparation.

**Going live without clear operational readiness**

If support setup, monitoring, access or runbooks are weak, avoidable instability is created from day one.

**Leaving adoption activities too late**

Users and stakeholders often need communication, guidance or training before the release happens, not after.

**Making the pack too detailed**

The main pack should support release coordination and decision-making, not become a full technical runbook.

**Assuming live means finished**

Known issues, stabilization needs and immediate follow-up should still be visible after go-live.

**Unclear ownership during go-live**

If responsibilities are blurred, issue handling and coordination become weaker when pressure is highest.

**Treating automation as separate from readiness**

Automated testing and deployment can reduce friction and risk, but they do not remove the need for operational visibility, support readiness and clear release ownership.

## Related lifecycle stages

This deliverable is most closely linked to [Deploy](stage.html?s=deploy), where the change is released, rolled out and made ready for normal live use.

It builds on:
- [Develop & Deliver](stage.html?s=develop-and-deliver), where the changes are built, validated and prepared for release

It leads into:
- [Operate & Monitor](stage.html?s=operate-and-monitor), where the product is managed in normal live operation
- [Measure & Learn](stage.html?s=measure-and-learn), where usage, adoption and outcome signals begin to matter in practice

In that sense, the Release & Readiness Pack is the bridge between execution and live operation.

## Templates and supporting materials

The core template for this deliverable is the [Release & Readiness Pack template](supporting-materials/release-and-readiness-pack/).

Supporting materials may include:
- deployment checklists
- rollout plans
- support readiness checklists
- monitoring and alert setup
- runbooks and support notes
- communication plans
- training material
- rollback plans
- go-live issue logs

Where possible, the pack should link to source material rather than duplicate detailed operational or technical documentation.

The aim is not to create a heavy go-live pack. It is to create one practical release deliverable that helps the team coordinate safely and move into live operation with clarity.
