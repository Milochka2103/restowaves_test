import express from "express";
import { productsRouter } from "./products-router.js";

export const indexRouter = express.Router();

indexRouter.use("/products", productsRouter);
// indexRouter.use("/brands", brandsRouter);
// indexRouter.use("/categories", categoriesRouter);
// indexRouter.use("/subcategories", subCategoriesRouter);