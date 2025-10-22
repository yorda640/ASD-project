import { Request, Response } from "express";
import {
  addProduct,
  getProductById,
  getProducts,
  searchProducts,
  updateProductRating,
} from "../services/product.service";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const category = (req.query.category as string) || undefined;
    const result = await getProducts(page, category);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(500).json({ message: "Error getting products: ", e });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, category, price } = req.body;

    const product = await addProduct(name, description, category, price);
    res.status(201).json({ message: "Product added successfully", product });
  } catch (e: any) {
    res.status(500).json({ message: "Error adding a product: ", e });
  }
};

export const searchProductsByName = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    console.log(query);
    // if (!query) res.status(400).json({ message: "No query submitted" });
    const products = await searchProducts(query);
    if (products.length === 0)
      res.status(404).json({ message: `No results for: ${query}` });
    res.status(200).json(products);
  } catch (e: any) {
    res.status(500).json({ message: `Error searching: ${e}` });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({
        message: "Invalid product ID format",
      });
    }
    const product = await getProductById(productId);
    if (!product) res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (e: any) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const updateProductByRating = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({
        message: "Invalid product ID format",
      });
    }

    await updateProductRating(productId);

    res.status(200).json({ message: "Product Updated" });
  } catch (e: any) {
    res.status(500).json({ message: "Error updating the rating: ", e });
  }
};
