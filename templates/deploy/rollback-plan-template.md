# Rollback Plan

**Product / Release:** [Name and version]
**Date:** [DD/MM/YYYY]
**Owner:** [Name, Role]

---

## Rollback Decision Authority

_Who is authorised to trigger a rollback?_

| Role | Name | Contact |
|------|------|---------|
| Primary | [Name] | [Slack / Phone] |
| Backup | [Name] | [Slack / Phone] |

---

## Rollback Triggers

_Initiate this procedure immediately if any of the following are observed:_

- [ ] [Condition 1 — e.g. error rate > X% for more than Y minutes]
- [ ] [Condition 2 — e.g. P1 incident raised by support team]
- [ ] [Condition 3 — e.g. key metric drops below threshold]

---

## Rollback Steps

| Step | Action | Owner | Estimated Time |
|------|--------|-------|---------------|
| 1 | Confirm rollback decision with [Role] | [Name] | 2 min |
| 2 | Notify on-call team and stakeholders | [Name] | 5 min |
| 3 | [Technical rollback step — e.g. revert deployment via CI/CD] | [Name] | [X min] |
| 4 | [Database migration rollback if required] | [Name] | [X min] |
| 5 | Verify health checks and smoke tests pass | [Name] | [X min] |
| 6 | Confirm with monitoring that error rates are normalising | [Name] | [X min] |
| 7 | Notify stakeholders of rollback completion | [Name] | 5 min |

**Total estimated rollback time:** [X minutes]

---

## Post-Rollback Actions

- [ ] Incident report created
- [ ] Root cause identified
- [ ] Fix validated in staging before re-attempting deployment
- [ ] Retrospective scheduled

---

_This plan must be reviewed and approved before each production deployment._
