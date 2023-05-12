import nftRoutes from "./NFT";
import { Express } from "express";

export default (app: Express) => {
  app.use("/api/nft", nftRoutes);
};
