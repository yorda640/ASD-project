import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { PORT } from "./config/env";
import productRouter from "./routes/product.route";
import reviewRouter from "./routes/review.route";
// import reviewRouter from "./routes/review.route";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/products", productRouter);
app.use("/reviews", reviewRouter);

(async (port) => {
  await connectDB();
  app.listen(port, () => console.log(`Backend server started on port ${port}`));
})(PORT);
