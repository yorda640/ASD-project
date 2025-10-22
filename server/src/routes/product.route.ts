import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  searchProductsByName,
  updateProductByRating,
} from "../controller/product.controller";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);
productRouter.get("/search", searchProductsByName);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", updateProductByRating);

export default productRouter;
