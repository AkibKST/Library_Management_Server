import express, { Application, Request, Response } from "express";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());

// routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

//not found
app.use(notFound);

export default app;
