import {useForm} from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";  

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

type LoginFormInputs = {
    email : string;
    password : string;
};

export const LoginFormYup = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<LoginFormInputs | null>(null);

    const {register, handleSubmit, formState:{errors}} = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormInputs) => {
        console.log("Yup Form Data:",data);
        setIsSubmitted(true);
        setSubmittedData(data);
    };

    return(
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
            <button type="submit">Login (Yup)</button>
        </form>

       {isSubmitted && submittedData && (
        <div>
        <h3>Form has been submitted successfully! ✅</h3>
          <h4>Submitted Data:</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
       )}
       </>
    )
}