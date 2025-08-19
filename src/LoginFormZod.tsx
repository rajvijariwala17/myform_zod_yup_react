
import  { useState } from "react"; // 1. Import useState
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginFormZod = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<LoginFormInputs | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  // 3. Update the onSubmit function to set the state
  const onSubmit = (data: LoginFormInputs) => {
    console.log("Zod Form Data:", data);
    setIsSubmitted(true);
    setSubmittedData(data);
  };

  return (
    // Use a React Fragment <> to return multiple elements
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div><br></br>
        <div>
          <label>Password:</label>
          <input type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </div><br></br>
        <button type="submit">Login (Zod)</button>
      </form>

      {/* 4. Conditionally render the success message and data */}
      {isSubmitted && submittedData && (
        <div>
          <h3>Form has been submitted successfully! ✅</h3>
          <h4>Submitted Data:</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </>
  );
};