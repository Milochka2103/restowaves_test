import "dotenv/config";
import axios from "axios";
import { Product, Size } from "../db/models/index.js";
import { productPropertyIndexes, sizesMap } from "../constants.js";

const { API_KEY } = process.env;

export const productsController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.send(products);
    } catch (error) {
      console.error("Error getting all products: ", error);
      throw new Error("Error getting all products");
    }
  },
  getProductByPk: async (req, res) => {
    const { id } = req.params;
    try {
      const singleProduct = await Product.findByPk(id, {
        include: [Size], // Include the Size model
      });
      res.send(singleProduct);
    } catch (error) {
      console.error("Error getting single product: ", error);
      throw new Error("Error getting single product");
    }
  },
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const singleProduct = await Product.findByPk(id);
      singleProduct.name = name;
      await singleProduct.save();
      return res.send(singleProduct);
    } catch (error) {
      console.error("Error changing product's name: ", error);
      throw new Error("Error changing product's name");
    }
  },
  getProductBySize: async (req, res) => {
    const { size } = req.params;
    try {
      const productsInSize = await Product.findAll({
        include: [
          {
            model: Size,
            where: { [sizesMap[size]]: true },
          },
        ],
      });

      res.send(productsInSize);
    } catch (error) {
      console.error("Error getting products in this size: ", error);
      throw new Error("Error getting products in this size");
    }
  },
getActual: async (req, res) => {
  try {
    const spreadsheetId = "1bjqDqLZgjZSZ_fOBolseUDg7L0ktG50BlD9tAYm4rwg";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${API_KEY}`;
    const result = (await axios.get(url)).data;
    const sheets = result.sheets || []

    if (!sheets.length) {
      res.send("no sheets found");
      return;
    }
    for (const sheet of sheets) {
      const sheetTitle = sheet.properties?.title;

      if (sheetTitle) {
        const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetTitle}?key=${API_KEY}`;
        const result = (await axios.get(sheetUrl)).data;
        const rows = result?.values || [];
        if (rows.length) {
          // Assumably first product variation property has filled cells for all product variations,
          // that exist for this product group.
          const productCount = rows[0].length - 1; // minus property name
          // const products = [];
          // const productSizesMap = {};

          for (let step = 1; step <= productCount; step++) {
            const artikul = rows[productPropertyIndexes["artikul"]][[step]];

            // Check if product with the given artikul already exists in the database 
            const existingProduct = await Product.findOne({
              where: { artikul: artikul },
            });

            if (existingProduct) {
              const sizesChanged = {};

              for (let size = 36; size <= 46; size++) {
                const sizeColumnName = `size${size}`;
                const newSizeValue = rows[productPropertyIndexes[sizeColumnName]][
                  step
                ]
                  ? true
                  : false;

                if (Size[sizeColumnName] !== newSizeValue) {
                  sizesChanged[sizeColumnName] = newSizeValue;
                }
              }

              if (Object.keys(sizesChanged).length > 0) {
                // Update the sizes in the database
                await Size.update(sizesChanged, {
                  where: {
                    productId: existingProduct.id,
                  },
                });
              }
            } else {
              // Product doesn't exist, add it to the database
              const product = {
                model: sheetTitle,
                name: rows[productPropertyIndexes["name"]][[step]],
                artikul: artikul,
                price: rows[productPropertyIndexes["price"]][[step]],
                // size: productSizes,
              };
              // products.push(product);
              const productResult = await Product.create(product);
              const productSizes = {
                productId: productResult.id,
              };

              for (const size in sizesMap) {
                const sizeColumnName = sizesMap[size];
                productSizes[sizeColumnName] = rows[productPropertyIndexes[sizeColumnName]][step] ? true : false;
              }

              await Size.create(productSizes);
            }
          }
        }
      }
    }
      res.send("Data was updating in DB");
    } catch (error) {
      console.error("Error", error);
      throw new Error("Internal Server Error");
    }
  },

  getActualWrapper: (req, res) => {
    productsController.getActual(req, res).catch((error) => {
      console.error("Error", error);
      throw new Error("Internal Server Error");
    });
  },

  //Simulate changing size without changing real Google Table, you can delete this module
  simulateSizeChange: async (req, res) => {
    try {
      // Find the product with id 1
      const product = await Product.findByPk(1);

      if (product) {
        // Simulate a change in size36
        const newSizeValue = !product.size36; // Toggle the value
        const sizesChanged = { size36: newSizeValue };

        // Update the size in the database
        await Size.update(sizesChanged, {
          where: {
            productId: product.id,
          },
        });

        res.send(`Size36 for Product with id 1 changed to ${newSizeValue}`);
      } else {
        res.send("Product not found");
      }
    } catch (error) {
      console.error("Error simulating size change", error);
      throw new Error("Internal Server Error");
    }
  },
};
