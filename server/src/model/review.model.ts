import { model, Schema } from "mongoose";
import { IReview } from "../types/review";

const reviewSchema: Schema = new Schema<IReview>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// reviewSchema.post('save', async function(doc) {
//   await model('Product').findByIdAndUpdate()
// })
export const Review = model<IReview>("Review", reviewSchema);
