import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

import serviceAccountKey from "./serviceAccountKey.json";

dotenv.config();

const app = express();

// Body parser for our JSON data
app.use(express.json());

// Cross origin
app.use(cors({ origin: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// Firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
});

// API endpoints
app.get("/", (req: Request, res: Response) => {
  return res.send("The Server Is Running!");
});

exports.app = functions.https.onRequest(app);
