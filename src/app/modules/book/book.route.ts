import express from "express";
import { BookControllers } from "./book.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidations } from "./book.validation";

const router = express.Router();

//create book route
router.post(
  "/",
  validateRequest(BookValidations.createBookValidationSchema),
  BookControllers.createBook
);
//--------------------------------

//get all books route with filter, pagination, and sorting
router.get("/", BookControllers.getAllBooks);
//--------------------------------

//get single book route
router.get("/:bookId", BookControllers.getSingleBookById);
//--------------------------------

export const BookRoutes = router;
