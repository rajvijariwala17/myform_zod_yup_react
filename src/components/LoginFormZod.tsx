import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginFormZod: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<LoginFormInputs | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Zod Form Data:', data);
    setIsSubmitted(true);
    setSubmittedData(data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="zod-email">Email:</label>
          <input id="zod-email" type="email" {...register('email')} />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="zod-password">Password:</label>
          <input id="zod-password" type="password" {...register('password')} />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>
        <button type="submit">Login (Zod)</button>
      </form>

      {isSubmitted && submittedData && (
        <div className="submitted-data">
          <h3>Form has been submitted successfully! ✅</h3>
          <h4>Submitted Data:</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};