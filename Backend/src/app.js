import express from "express";
import parsePdfRouter from "./routes/parse-pdf.js";
import { parse } from "dotenv";

const app = express();

app.use(express.json());

//routes
app.use("/api", parsePdfRouter);

export default app;
