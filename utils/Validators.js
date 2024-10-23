import { object, string, number, date, InferType } from "yup";

let updatePasswordSchema = object({
  password: string()
    .required()
    .min(6, "Password must be greater than 6 length"),
  newPassword: string()
    .required()
    .min(6, "Password must be greater than 6 length"),
});

export { updatePasswordSchema };
