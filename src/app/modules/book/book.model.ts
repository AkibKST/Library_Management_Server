import { model, Schema } from "mongoose";
import { TBook } from "./book.interface";

// Create the Mongoose schema
const BookSchema = new Schema<TBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "{VALUE} is not a valid genre",
      },
      uppercase: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Instance methods for the Book model
BookSchema.methods.updateAvailability = async function () {
  if (this.copies <= 0) {
    this.available = false;
    await this.save();
  }
};

// Create and export the model
export const Book = model<TBook>("Book", BookSchema);
