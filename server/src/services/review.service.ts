import mongoose from "mongoose";
import { Review } from "../model/review.model";
import { updateProductRating } from "./product.service";

export const getReviewsByProduct = async (productId: string) => {
  return await Review.find({ productId }).sort({ date: -1 }).exec();
};

export const createReview = async (
  productId: string,
  author: string,
  rating: number,
  comment: string
) => {
  try {
    const review = new Review({
      productId,
      author,
      rating,
      comment,
    });
    const savedReview = await review.save();
    await updateProductRating(productId);
    return savedReview;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const updateReview = async (
  productId: string,
  reviewId: string,
  updates: Partial<{ comment: string }>
) => {
  try {
    console.log("Updating review with ID:", reviewId);
    const existingReview = await Review.findById(reviewId);
    if (!existingReview) {
      console.log("No review found with this ID");
    }
    const updatedReview = await Review.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(reviewId) },
      { $set: { comment: updates.comment } },
      { new: true }
    ).exec();

    if (updatedReview) {
      await updateProductRating(productId);
    }

    return updatedReview;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductReview = async (
  reviewId: string,
  productId: string
) => {
  const deleteReview = await Review.findByIdAndDelete(reviewId).exec();
  if (deleteReview) {
    await updateProductRating(productId);
  }
  return deleteReview;
};
