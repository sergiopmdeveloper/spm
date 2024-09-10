import { z, defineCollection } from "astro:content";

const studiesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    school: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  }),
});

export const collections = {
  studies: studiesCollection,
};
