import { z } from "zod";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: "Username doit avoir 3 caractères minimum.",
      })
      .max(255, {
        message: "Username ne peut contenir plus de 255 caractères",
      }),
    email: z.string().email("Veuillez saisir un email valide"),
    password: z
      .string()
      .min(11, {
        message: "Le mot de passe doit contenir au minimum 11 caractères.",
      })
      .regex(
        new RegExp("[A-Z]"),
        "Le mot de passe doit contenir au moins une majuscule"
      )
      .regex(
        new RegExp("[0-9]"),
        "Le mot de passe doit contenir au moins un chiffre"
      )
      .regex(
        new RegExp("[a-z]"),
        "Le mot de passe doit contenir au moins une minuscule"
      )
      .regex(
        new RegExp("[^a-zA-Z0-9 ]"),
        "Le mot de passe doit contenir au moins un caractère spéciale"
      ),
    checkPassword: z.string(),
    motivation: z.string().min(10),
  })
  .refine((data) => data.password === data.checkPassword, {
    message: "Le mot de passe ne correspond pas.",
    path: ["checkPassword"],
  });

export default formSchema;
