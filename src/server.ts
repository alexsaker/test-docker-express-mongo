import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import { userRouter } from "./user";
import * as mongoose from "mongoose";
import * as environment from "../config/environment";
const mongoConnection = mongoose
  .connect(`${environment.MONGO_DB_URI}`)
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use("/api/v1/users", userRouter);
app.listen(8080);
export { app };
