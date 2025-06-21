import express from "express";
import { BookControllers } from "./book.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidations } from "./book.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(BookValidations.createBookValidationSchema),
  BookControllers.createBook
);

export const BookRoutes = router;
