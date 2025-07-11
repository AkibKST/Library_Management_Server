import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(cors());

// routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

// global error handler
app.use(globalErrorHandler);

//not found
app.use(notFound);

export default app;
