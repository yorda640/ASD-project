import { Document, Schema } from "mongoose";

export interface IReview extends Document {
  productId: Schema.Types.ObjectId;
  author: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface IReviewCreateDTO {
  productId: string;
  author: string;
  rating: number;
  comment: string;
}

export interface IReviewUpdateDTO extends Partial<IReviewCreateDTO> {}
