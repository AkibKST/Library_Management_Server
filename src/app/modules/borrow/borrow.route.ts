import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BorrowValidations } from "./borrow.validation";
import { BorrowControllers } from "./borrow.controller";

const router = express.Router();

//create borrow route
router.post(
  "/",
  validateRequest(BorrowValidations.BorrowSchema),
  BorrowControllers.createBorrow
);
//--------------------------------

//get all borrow route with aggregation
router.get("/", BorrowControllers.getAllBorrows);
//--------------------------------

export const BorrowRoutes = router;
