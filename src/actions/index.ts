import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  sendContactEmail: defineAction({
    accept: "form",
    input: z.object({
      name: z
        .string()
        .nullable()
        .refine((val) => val !== null, {
          message: "Name required",
        }),
      email: z
        .string()
        .email("Invalid email")
        .nullable()
        .refine((val) => val !== null, {
          message: "Email required",
        }),
      message: z
        .string()
        .nullable()
        .refine((val) => val !== null, {
          message: "Message required",
        }),
    }),
    handler: async () => {
      return {
        success: true,
        message: "Email sent!",
      };
    },
  }),
};
