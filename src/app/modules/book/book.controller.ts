import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookServices } from "./book.service";

const createBook = catchAsync(async (req, res) => {
  const bookData = req.body;
  const result = await BookServices.createBookIntoDB(bookData);

  sendResponse(res, {
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

export const BookControllers = {
  createBook,
};
