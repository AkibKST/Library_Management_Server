import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://library_management:library_management@cluster0.s1acxwp.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Connected to MongoDB Using Mongoose!!");

    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
