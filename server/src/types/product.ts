import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  dateAdded: Date;
  averageRating: number;
  reviews: Types.ObjectId[];
}

export interface IProductCreateDTO {
  name: string;
  description: string;
  category: string;
  price: number;
}

export interface IProductUpdateDTO extends Partial<IProductCreateDTO> {
  product: any;
  reviews: any[];
  ratingSummary: {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: number;
  };
}

export interface PageResponse<T> {
  data: [];
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
  };
}
