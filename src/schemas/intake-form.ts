import { z } from 'zod';

// CF-REF: validation-layer-divergence.md [48]
export const patientIntakeFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be 50 characters or fewer')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be 50 characters or fewer')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .transform((v) => v.trim().toLowerCase()),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^\(\d{3}\) \d{3}-\d{4}$/,
      'Phone must be in (xxx) xxx-xxxx format'
    ),

  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),

  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z
      .string()
      .length(2, 'Use 2-letter state code')
      .regex(/^[A-Z]{2}$/, 'State must be uppercase 2-letter code'),
    zip: z
      .string()
      .regex(/^\d{5}-\d{4}$/, 'ZIP must be in ZIP+4 format (xxxxx-xxxx)'),
  }),

  insuranceId: z
    .string()
    .min(9, 'Insurance ID must be at least 9 characters')
    .max(20, 'Insurance ID must be 20 characters or fewer')
    .regex(/^[A-Z0-9]+$/, 'Insurance ID must be uppercase alphanumeric'),

  insuranceProvider: z.string().min(1, 'Insurance provider is required'),

  reasonForVisit: z
    .string()
    .min(10, 'Please describe your reason for visit (at least 10 characters)')
    .max(1000, 'Reason for visit must be 1000 characters or fewer'),
});

export type PatientIntakeFormData = z.infer<typeof patientIntakeFormSchema>;
