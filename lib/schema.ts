import { z } from "zod";

const emailSchema = z.string({ message: "Email is required" }).email({
  message: "Not a valid Email",
});

const passwordSchema = z
  .string({ message: "Password is required" })
  .min(3, "Password should be atleast 3 characters")
  .max(10, "Password should be atmost 10 characters");

const authFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export { authFormSchema, emailSchema, passwordSchema };
