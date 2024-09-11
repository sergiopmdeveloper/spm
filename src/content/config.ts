import { defineCollection, z } from "astro:content";

const studiesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    school: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
  }),
});

const careerCollection = defineCollection({
  type: "content",
  schema: z.object({
    job: z.string(),
    company: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
  }),
});

export const collections = {
  studies: studiesCollection,
  career: careerCollection,
};
