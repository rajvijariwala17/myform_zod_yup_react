import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type LoginFormInputs = yup.InferType<typeof loginSchema>;

export const LoginFormYup: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<LoginFormInputs | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Yup Form Data:', data);
    setIsSubmitted(true);
    setSubmittedData(data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="yup-email">Email:</label>
          <input id="yup-email" type="email" {...register('email')} />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="yup-password">Password:</label>
          <input id="yup-password" type="password" {...register('password')} />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>
        <button type="submit">Login (Yup)</button>
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