import { z, defineCollection } from "astro:content";

const studiesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    school: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date(),
  }),
});

export const collections = {
  studies: studiesCollection,
};
