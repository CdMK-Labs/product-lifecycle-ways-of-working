# Deployment Checklist

**Product / Release:** [Name and version]
**Date:** [DD/MM/YYYY]
**Deployment Lead:** [Name]
**Approver:** [Name, Role]

---

## Pre-Deployment

### Code and Quality Gates
- [ ] All items in scope have met the Definition of Done
- [ ] All automated tests passing in staging environment
- [ ] Security scan completed with no critical findings
- [ ] Performance benchmarks within acceptable thresholds
- [ ] Dependency versions pinned and reviewed

### Environment Readiness
- [ ] Staging deployment tested and verified
- [ ] Production environment capacity confirmed
- [ ] Feature flags configured correctly
- [ ] Environment variables and secrets updated
- [ ] Database migrations prepared and tested

### Communication
- [ ] Deployment window communicated to stakeholders
- [ ] On-call team notified and available
- [ ] Maintenance page prepared (if downtime expected)
- [ ] Rollback procedure documented and shared

---

## Deployment

- [ ] Deployment initiated at [time]
- [ ] Deployment completed at [time]
- [ ] Database migrations executed successfully
- [ ] Health checks passing
- [ ] Smoke tests passed

---

## Post-Deployment

- [ ] Key user journeys verified in production
- [ ] Monitoring dashboards checked — no anomalies
- [ ] Error rates within normal range
- [ ] Performance metrics within acceptable range
- [ ] Stakeholders notified of successful deployment
- [ ] Release notes published

---

## Rollback Trigger Criteria

_Initiate rollback if any of the following occur within [X] hours of deployment:_

- Error rate exceeds [X]%
- [Critical metric] falls below [threshold]
- [Other condition]

**Rollback procedure:** [Link to rollback plan]

---

_Sign-off: [Name] — [Date] — [Time]_
