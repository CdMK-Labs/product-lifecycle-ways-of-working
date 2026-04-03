# Migration Checklist

**Product / Service Being Retired:** [Name]
**Migration Target:** [Replacement product / service / None]
**Date:** [DD/MM/YYYY]
**Owner:** [Name, Role]

---

## Pre-Migration

### Planning
- [ ] Migration scope defined — what data, users, and integrations are in scope
- [ ] Migration approach agreed (lift-and-shift / re-platform / retire without replacement)
- [ ] Migration timeline communicated to all affected parties
- [ ] Rollback plan defined in case migration fails

### User Readiness
- [ ] Users notified of migration [X weeks] in advance
- [ ] Self-service migration guide published
- [ ] Support channel established for migration queries
- [ ] High-value users contacted individually (if applicable)

### Technical Readiness
- [ ] Data export / extraction tested in staging
- [ ] Target system capacity confirmed
- [ ] API or integration cut-over plan tested
- [ ] Data mapping validated between source and target schemas

---

## Migration Execution

| Step | Description | Owner | Status |
|------|-------------|-------|--------|
| 1 | Export data from [source system] | [Name] | [ ] |
| 2 | Validate exported data completeness | [Name] | [ ] |
| 3 | Import data to [target system] | [Name] | [ ] |
| 4 | Validate imported data in target | [Name] | [ ] |
| 5 | Update integrations to point to target | [Name] | [ ] |
| 6 | Redirect user traffic to target | [Name] | [ ] |
| 7 | Confirm users can access data in target | [Name] | [ ] |

---

## Post-Migration

- [ ] Data integrity verified in target system
- [ ] No critical data gaps identified
- [ ] Source system access revoked or blocked
- [ ] Users confirmed as successfully migrated
- [ ] Support tickets related to migration resolved
- [ ] Migration completion communicated to stakeholders

---

## Issues Log

| Issue | Severity | Resolution | Owner |
|-------|---------|-----------|-------|
| [Description] | High / Med / Low | [Action taken] | [Name] |

---

_Sign-off: [Name, Role] — [Date]_
