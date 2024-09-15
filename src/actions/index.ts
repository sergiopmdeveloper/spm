import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

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
    handler: async (input) => {
      try {
        const { name, email, message } = input;

        const { error } = await resend.emails.send({
          from: "Sergio <onboarding@resend.dev>",
          to: ["sergio.pm.developer@gmail.com"],
          subject: "New contact!",
          html: `
            <h1>New Contact Form Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
          `,
        });

        if (error) {
          return {
            success: false,
            message: "Failed to send email",
          };
        }

        return {
          success: true,
          message: "Email sent successfully",
        };
      } catch (error) {
        console.error("Error sending email:", error);

        return {
          success: false,
          message: "An error occurred while sending the email",
        };
      }
    },
  }),
};
