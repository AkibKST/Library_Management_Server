import z from "zod";

const BorrowSchema = z.object({
  book: z.string().refine(
    (val) => {
      return /^[0-9a-fA-F]{24}$/.test(val); // Validate MongoDB ObjectId format
    },
    {
      message: "Invalid book ID format",
    }
  ),
  quantity: z.number().int().positive().min(1, {
    message: "Quantity must be at least 1",
  }),
  dueDate: z
    .string()
    .datetime({ message: "Must be a valid ISO date string" })
    .transform((val) => new Date(val))
    .refine((date) => date > new Date(), "Due date must be in the future"),
});

export const BorrowValidations = {
  BorrowSchema,
};
