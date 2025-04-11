import { z } from "zod";

const roomFormShema = z.object({
  game: z
    .string()
    .min(3, {
      message: "Le titre doit avoir 3 caractères minimum.",
    })
    .max(255, {
      message: "Le titre ne peut contenir plus de 255 caractères",
    }),
});

export default { roomFormShema };
