import { model, Schema } from "mongoose";
import { TBorrow } from "./borrow.interface";

const BorrowSchema: Schema<TBorrow> = new Schema<TBorrow>({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "Book is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: 1,
  },
  dueDate: {
    type: Date,
    required: [true, "Due date is required"],
    validate: {
      validator: (value: Date) => value > new Date(),
      message: "Due date must be in the future",
    },
  },
});

export const Borrow = model<TBorrow>("Borrow", BorrowSchema);
