import * as functions from "firebase-functions";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/user";
import productRouter from "./routes/products";

dotenv.config();

const app = express();

// Body parser for our JSON data
app.use(express.json());

// Cross origin
app.use(cors({ origin: "*" }));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// API endpoints
app.get("/", (req: Request, res: Response) => {
  return res.send("The Server Is Running!");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// Export your Express app as a Firebase Function
exports.app = functions.https.onRequest(app);
