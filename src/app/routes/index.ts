import { Router } from "express";
import { BookRoutes } from "../modules/book/book.route";
import { BorrowRoutes } from "../modules/borrow/borrow.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/borrow",
    route: BorrowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
