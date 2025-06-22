import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BorrowServices } from "./borrow.service";

//create borrow controller
const createBorrow = catchAsync(async (req, res) => {
  const borrowData = req.body;
  const result = await BorrowServices.createBorrowIntoDB(borrowData);

  sendResponse(res, {
    success: true,
    message: "Book borrowed successfully",
    data: result,
  });
});
//--------------------------------

//create get all books controller
// const getAllBorrows = catchAsync(async (req, res) => {
//   sendResponse(res, {
//     success: true,
//     message: "Borrowed books summary retrieved successfully",
//     data: result,
//   });
// });
//--------------------------------

export const BorrowControllers = {
  createBorrow,
};
