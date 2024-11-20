import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/UserController";
import { AppDataSource } from "./ormconfig";
import * as dotenv from "dotenv";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    const app = createExpressServer({
      controllers: [UserController],
    });

    const port = 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.error("Error during Data Source initialization");
  });
