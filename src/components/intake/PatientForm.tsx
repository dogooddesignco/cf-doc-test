import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  patientIntakeFormSchema,
  type PatientIntakeFormData,
} from '@/schemas/intake-form';

export function PatientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientIntakeFormData>({
    resolver: zodResolver(patientIntakeFormSchema),
  });

  const onSubmit = async (data: PatientIntakeFormData) => {
    const response = await fetch('/api/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Personal Information</legend>

        <label>
          First Name
          <input {...register('firstName')} />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </label>

        <label>
          Last Name
          <input {...register('lastName')} />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </label>

        <label>
          Email
          <input type="email" {...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
        </label>

        <label>
          Phone
          <input
            type="tel"
            placeholder="(555) 123-4567"
            {...register('phone')}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </label>

        <label>
          Date of Birth
          <input type="date" {...register('dateOfBirth')} />
          {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
        </label>
      </fieldset>

      <fieldset>
        <legend>Address</legend>

        <label>
          Street
          <input {...register('address.street')} />
          {errors.address?.street && (
            <span>{errors.address.street.message}</span>
          )}
        </label>

        <label>
          City
          <input {...register('address.city')} />
          {errors.address?.city && (
            <span>{errors.address.city.message}</span>
          )}
        </label>

        <label>
          State
          <input maxLength={2} placeholder="NJ" {...register('address.state')} />
          {errors.address?.state && (
            <span>{errors.address.state.message}</span>
          )}
        </label>

        <label>
          ZIP Code
          <input placeholder="07701-1234" {...register('address.zip')} />
          {errors.address?.zip && (
            <span>{errors.address.zip.message}</span>
          )}
        </label>
      </fieldset>

      <fieldset>
        <legend>Insurance</legend>

        <label>
          Insurance ID
          <input {...register('insuranceId')} />
          {errors.insuranceId && <span>{errors.insuranceId.message}</span>}
        </label>

        <label>
          Provider
          <input {...register('insuranceProvider')} />
          {errors.insuranceProvider && (
            <span>{errors.insuranceProvider.message}</span>
          )}
        </label>
      </fieldset>

      <fieldset>
        <legend>Visit Details</legend>

        <label>
          Reason for Visit
          <textarea rows={4} {...register('reasonForVisit')} />
          {errors.reasonForVisit && (
            <span>{errors.reasonForVisit.message}</span>
          )}
        </label>
      </fieldset>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Intake Form'}
      </button>
    </form>
  );
}
