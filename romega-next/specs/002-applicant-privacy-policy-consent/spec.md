# Feature Specification: Applicant Privacy Policy and Consent Alignment

**Feature Branch**: `[002-applicant-privacy-policy-consent]`  
**Created**: 2026-03-20  
**Status**: Draft  
**Input**: User description: "We now have a signed Applicant Data Privacy and Consent Agreement and need the website privacy policy and required website behavior updated."

## User Scenarios and Testing (mandatory)

### User Story 1 - Clear Public Privacy Policy (Priority: P1)

As a website visitor or applicant, I want to read a complete and accurate privacy policy, so I can understand what personal data is collected, why it is used, and what rights I have.

**Why this priority**: Legal transparency is the baseline compliance requirement and affects all data collection points.

**Independent Test**: Open Privacy Policy from footer and contact page and verify the same updated policy content appears with a current "Last updated" date.

**Acceptance Scenarios**:

1. **Given** a user opens Privacy Policy from any website entry point, **When** the policy is displayed, **Then** the content includes collection, purpose, retention, sharing, security, rights, and contact details.
2. **Given** the policy is updated, **When** the user views the policy, **Then** the displayed version and date are consistent across all entry points.

---

### User Story 2 - Explicit and Granular Applicant Consent (Priority: P1)

As an applicant, I want to provide specific consent choices, so I can control whether my data is used for current hiring, future opportunities, client matching, and public showcase.

**Why this priority**: The signed agreement and PH data privacy requirements depend on informed and specific consent, not bundled consent.

**Independent Test**: Submit applicant-related data path with consent options and verify each consent choice is captured with timestamp and policy version.

**Acceptance Scenarios**:

1. **Given** an applicant submits data, **When** consent is required, **Then** the system captures required processing consent before completion.
2. **Given** optional uses are presented, **When** the applicant does not opt in, **Then** the system does not enable those optional uses.

---

### User Story 3 - Consent Evidence and Withdrawal Handling (Priority: P2)

As operations/compliance staff, I want consent evidence and removal workflow records, so the company can respond to access, correction, withdrawal, and deletion requests.

**Why this priority**: Auditability and takedown responsiveness reduce PH and US compliance exposure.

**Independent Test**: Retrieve a sample applicant consent record and process a simulated withdrawal/removal request end-to-end.

**Acceptance Scenarios**:

1. **Given** an applicant asks to withdraw consent, **When** operations processes the request, **Then** the profile is unpublished or removed within policy SLA.
2. **Given** an applicant has no public showcase consent, **When** profile data is evaluated for public pages, **Then** the profile is not publicly listed.

### Edge Cases

- Legacy profiles exist without explicit publication consent evidence.
- Applicant provided consent for internal matching but not for public showcase.
- Consent is withdrawn after profile has already been published.
- Applicant requests deletion while legal/operational retention exceptions still apply.
- Inconsistent policy text appears in modal vs footer vs contact entry points.
- Incorrect company contact details appear in legal text due to copy errors.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: The website MUST provide one canonical Privacy Policy source that is consistent across footer, contact page, and modal/linked entry points.
- **FR-002**: The Privacy Policy MUST include organization identity and accurate contact details.
- **FR-003**: The Privacy Policy MUST list applicant data categories collected, including resume/CV, portfolio links, professional history, and evaluation records.
- **FR-004**: The Privacy Policy MUST define processing purposes for recruitment, future opportunities, client matching, and professional presentation.
- **FR-005**: The Privacy Policy MUST define sharing boundaries (internal authorized personnel, clients/partners, legal obligations) and minimum-necessary disclosure.
- **FR-006**: The Privacy Policy MUST describe retention logic and applicant rights to access, correction, withdrawal, blocking, and deletion.
- **FR-007**: Applicant-facing consent capture MUST separate required processing consent from optional consent scopes.
- **FR-008**: Public profile showcase MUST require separate, explicit opt-in consent and MUST default to not published.
- **FR-009**: The system MUST store consent evidence with at least policy version, consent scopes, timestamp, and actor/source.
- **FR-010**: Public talent listing and profile rendering MUST exclude profiles without valid publication consent.
- **FR-011**: Public pages MUST not display disallowed sensitive fields (for example personal email, direct phone, full address, government IDs, protected attributes).
- **FR-012**: The system MUST provide a documented withdrawal/takedown workflow with defined response SLA.
- **FR-013**: Policy content MUST show a "Last updated" marker and version identifier.
- **FR-014**: All legal copy MUST be reviewed for plain-language clarity and typo-free final wording before production release.

### Key Entities (include if feature involves data)

- **PolicyVersion**: Canonical website privacy policy version, effective date, and text snapshot.
- **ApplicantConsentRecord**: Applicant identifier, consent scopes, policy version accepted, timestamp, collection channel, and evidence metadata.
- **TalentPublicationPermission**: Public showcase consent status and timestamps for each talent profile.
- **DataSubjectRequest**: Access/correction/deletion/withdrawal request record with status and completion timestamp.

## Assumptions

- The legal team or authorized business owner will provide final legal wording before production deployment.
- Careers job applications are currently routed externally (LinkedIn), but applicant/talent data still enters internal processes that need consent governance.
- The current site already has Privacy Policy entry points (modal and links) that can be aligned to one canonical policy source.
- Existing talent records may require one-time consent backfill review before public showcase.

## Out of Scope

- Full legal contract drafting by engineering.
- Building a complete external applicant tracking system.
- Introducing new third-party privacy tooling unless separately approved.

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: Privacy Policy content is consistent and reachable from all existing Privacy Policy entry points.
- **SC-002**: 100% of newly published public talent profiles have explicit publication consent records.
- **SC-003**: 0 public talent profiles without valid publication consent after launch.
- **SC-004**: Consent records include policy version and timestamp for compliance audit retrieval.
- **SC-005**: Withdrawal/takedown requests can be processed and completed within the defined internal SLA.
- **SC-006**: Lint, unit tests, and affected E2E tests pass after implementation.
