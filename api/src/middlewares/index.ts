import bodyParser from "body-parser";
import cors from "cors";
import { Express } from "express";

export default (app: Express) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cors());
};
