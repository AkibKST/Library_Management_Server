import { z } from "zod";

// genre enum
const BookGenreEnum = z.enum([
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
]);

export const createBookValidationSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").trim(),

  author: z.string().min(1, "Author cannot be empty").trim(),

  genre: BookGenreEnum,

  isbn: z.string().min(1, "ISBN cannot be empty"),

  description: z.string().trim().optional(),

  copies: z.number().min(0, "Copies cannot be negative"),

  available: z.boolean().default(true).optional(),
});

export const BookValidations = {
  createBookValidationSchema,
};
