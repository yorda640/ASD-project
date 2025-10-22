import { IReview } from "../types/review";
export const calculateAverageRating = (reviews: IReview[]): number => {
  if (!reviews || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const average = totalRating / reviews.length;
  return Math.round(average * 2) / 2;
};

export const calculateAverageRatingFromIds = async (
  reviewIds: string[]
): Promise<number> => {
  if (!reviewIds || reviewIds.length === 0) return 0;
  const { Review } = await import("../model/review.model");
  const reviews = await Review.find({ _id: { $in: reviewIds } })
    .select("rating")
    .exec();
  return calculateAverageRating(reviews);
};
