import express from "express";
import {
  addReview,
  deleteReview,
  getProductReview,
  updateProductReview,
} from "../controller/review.controller";

const reviewRouter = express.Router();

reviewRouter.get("/:id/reviews", getProductReview);
reviewRouter.post("/:id/reviews", addReview);
reviewRouter.delete("/reviews", deleteReview);
reviewRouter.put("/:productId/reviews/:reviewId", updateProductReview);
export default reviewRouter;
