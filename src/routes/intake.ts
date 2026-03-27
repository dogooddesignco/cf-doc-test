import { Router, Request, Response } from 'express';
import { patientIntakeApiSchema } from '@/schemas/intake-api';
import { db } from '@/db/client';

const router = Router();

router.post('/api/intake', async (req: Request, res: Response) => {
  const result = patientIntakeApiSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: result.error.flatten().fieldErrors,
    });
  }

  const data = result.data;

  try {
    let dob = data.dateOfBirth;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) {
      const [month, day, year] = dob.split('/');
      dob = `${year}-${month}-${day}`;
    }

    const patient = await db.query(
      `INSERT INTO patients (
        first_name, last_name, email, phone, date_of_birth,
        street, city, state, zip,
        insurance_id, insurance_provider,
        reason_for_visit
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING id`,
      [
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        dob,
        data.address.street,
        data.address.city,
        data.address.state,
        data.address.zip,
        data.insuranceId,
        data.insuranceProvider,
        data.reasonForVisit,
      ]
    );

    return res.status(201).json({
      message: 'Intake submitted successfully',
      patientId: patient.rows[0].id,
    });
  } catch (error) {
    console.error('Intake submission error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
