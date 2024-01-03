import express from "express";
import { productsController } from "../controllers/products-controller.js";

export const productsRouter = express.Router();

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/id/:id", productsController.getProductByPk);
productsRouter.get("/size/:size", productsController.getProductBySize);
productsRouter.get("/actual", productsController.getActual);
productsRouter.put("/:id", productsController.updateProduct);
productsRouter.get(
  "/simulateSizeChange",
  productsController.simulateSizeChange
);