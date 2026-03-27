import { z } from 'zod';

export const patientIntakeApiSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(100)
    .transform((v) => v.trim()),

  lastName: z
    .string()
    .min(1)
    .max(100)
    .transform((v) => v.trim()),

  email: z
    .string()
    .min(1)
    .transform((v) => v.trim().toLowerCase())
    .refine((v) => v.includes('@'), 'Must contain @'),

  phone: z
    .string()
    .min(1)
    .transform((v) => v.replace(/[\s()-]/g, ''))
    .refine((v) => /^\+?1?\d{10}$/.test(v), 'Must be a valid US phone number'),

  dateOfBirth: z
    .string()
    .min(1)
    .refine(
      (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) || /^\d{2}\/\d{2}\/\d{4}$/.test(v),
      'Date must be YYYY-MM-DD or MM/DD/YYYY'
    ),

  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z
      .string()
      .min(2)
      .max(2)
      .transform((v) => v.trim().toUpperCase()),
    zip: z
      .string()
      .refine(
        (v) => /^\d{5}(-\d{4})?$/.test(v.trim()),
        'Must be 5-digit or ZIP+4 format'
      ),
  }),

  insuranceId: z
    .string()
    .min(6)
    .max(20)
    .transform((v) => v.trim().toUpperCase()),

  insuranceProvider: z.string().min(1),

  reasonForVisit: z.string().min(1).max(2000),
});

export type PatientIntakeApiData = z.infer<typeof patientIntakeApiSchema>;
