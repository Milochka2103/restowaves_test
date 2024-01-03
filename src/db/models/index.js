import { Product } from "./product.js";
import { Size } from "./size.js";

Product.hasOne(Size);
Size.belongsTo(Product, {
  foreignKey: {
    name: "productId",
    allowNull: false,
  },
});

export { Product, Size };