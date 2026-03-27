# Validation Layers Are Intentionally Different — Do Not Unify

The patient intake system has three validation layers at intentionally different strictness levels:

**Form (`src/schemas/intake-form.ts`) — STRICT.** Enforces new data format standards: phone `(xxx) xxx-xxxx`, ZIP+4, ISO date, uppercase alphanumeric insurance IDs min 9 chars. This is the target format for all new patient data.

**API (`src/schemas/intake-api.ts`) — MODERATE.** Accepts both new and legacy formats. The mobile app (v2.x) hasn't been updated and still submits: raw digit phone numbers (`7325551234`), 5-digit ZIPs, `MM/DD/YYYY` dates, untrimmed emails with whitespace, and shorter insurance IDs (6+ chars from legacy partner systems). Tightening the API schema to match the form schema will break the mobile app for ~200 active mobile patients.

**Database (`src/db/migrations/001_patients.sql`) — MINIMAL.** VARCHAR length limits and NOT NULL only. No CHECK constraints on format. ~3,000 legacy records predate any format standards. Adding CHECK constraints requires a data migration planned for Q4.

## Convergence plan

1. **Q3:** Mobile app v3.0 ships with new format standards → API validation tightens to match form
2. **Q4:** Legacy data migration reformats existing records → DB CHECK constraints added

Until each milestone is reached, the layers MUST remain at different strictness levels.

## What this means in practice

- **Adding a new field:** Apply the same three-tier pattern. Strict on the form, lenient at the API, no format constraints at the DB.
- **Refactoring schemas:** Do NOT extract a shared schema used by both form and API. The duplication is intentional.
- **Tightening validation:** Only tighten a layer when its corresponding milestone is complete.
