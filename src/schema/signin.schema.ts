import * as yup from "yup";

const signInSchema = yup.object().shape({
    emailAddress: yup.string().required("Email is required field").email("Invalid email provided"),
    password: yup.string().required("Password is required field").min(8, "Minimum 8 characters required").max(32, "Password can't exceed 32 characters."),
    showPassword: yup.boolean().defined(),
});

export default signInSchema;