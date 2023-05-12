import express from "express";
import middleware from "./middlewares";
import routes from "./routes";
import dbConnect from "./config/db";
import { config } from "dotenv";

config();

const app = express();

middleware(app);
routes(app);
dbConnect();

export { app };
