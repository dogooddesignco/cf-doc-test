# TFC Patient Intake System

Patient intake and booking system for The Fascia Clinic.

## Stack

- React + TypeScript (frontend)
- Express + Zod (API)
- PostgreSQL (database)

## Structure

```
src/
  schemas/
    intake-form.ts  # Frontend form validation
    intake-api.ts   # API endpoint validation
  components/
    intake/
      PatientForm.tsx
  routes/
    intake.ts
  db/
    client.ts
    migrations/
      001_patients.sql
  server.ts
```

## Development

```bash
npm install
npm run dev
```
