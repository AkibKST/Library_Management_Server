import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Book } from "../book/book.model";
import { TBorrow } from "./borrow.interface";
import { Borrow } from "./borrow.model";

//create borrow into database
const createBorrowIntoDB = async (borrowData: TBorrow) => {
  // Validate the borrow data
  if (borrowData.book) {
    // Check if the book ID is valid
    const ValidBookId = await Book.findById(borrowData.book);
    if (!ValidBookId) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid book ID");
    }

    // Check if the quantity is valid
    const isValidQuantity = (borrowData.quantity <=
      (ValidBookId?.copies as number)) as boolean;
    if (!isValidQuantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Insufficient copies available"
      );
    }

    //Check book availability
    const bookAvailability = ValidBookId?.available;
    if (!bookAvailability) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Book is not available for borrowing"
      );
    }
  }

  //update book copies
  const book = await Book.findById(borrowData.book);
  if (!book) {
    throw new AppError(httpStatus.BAD_REQUEST, "Book not found");
  }
  book.copies -= borrowData.quantity;
  await book.updateAvailability();

  //create borrow
  const result = await Borrow.create(borrowData);

  return result;
};
//--------------------------------

// get all borrows from database with aggregation
const getAllBorrowsFromDB = async () => {
  const result = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    {
      $unwind: "$bookDetails",
    },
    {
      $project: {
        "book.title": "$bookDetails.title",
        "book.isbn": "$bookDetails.isbn",
        totalQuantity: 1,
      },
    },
  ]);

  return result;
};

export const BorrowServices = {
  createBorrowIntoDB,
  getAllBorrowsFromDB,
};
