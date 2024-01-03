import express from "express";
import cors from "cors";
import { sequelize } from "./src/db/database.js";
import { indexRouter } from "./src/routes/index-router.js";
import { productsController } from "./src/controllers/products-controller.js";

async function runApp() {
  try {
  await sequelize.sync();
    console.log("Sequelize tables created");

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/", indexRouter);

    app.listen(process.env.PORT || 3000, () => {
      console.log("app is running on port ${process.env.PORT}");
    });

    // Periodically fetch and process data from Google Sheets (every hour) 
    setInterval(() => {
      const dummyReq = {}; // Dummy request object
      const dummyRes = { send: console.log }; // Dummy response object with a send method

      productsController.getActualWrapper(dummyReq, dummyRes);
    }, 3600000);
  } catch (error) {
    console.log("App error: ", error);
    await sequelize.close();
  }
}

runApp();
