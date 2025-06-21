import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookServices } from "./book.service";

//create book controller
const createBook = catchAsync(async (req, res) => {
  const bookData = req.body;
  const result = await BookServices.createBookIntoDB(bookData);

  sendResponse(res, {
    success: true,
    message: "Book created successfully",
    data: result,
  });
});
//--------------------------------

//create get all books controller
const getAllBooks = catchAsync(async (req, res) => {
  const result = await BookServices.getAllBooksFromDB(req.query);

  sendResponse(res, {
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});
//--------------------------------

//get single book by id controller
const getSingleBookById = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const result = await BookServices.getSingleBookByIdFromDB(bookId);

  sendResponse(res, {
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});
//--------------------------------

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBookById,
};
