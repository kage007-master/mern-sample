import mongoose from "mongoose";
import NFTSchema from "../schema/NFT";

export default mongoose.model("base_nfts", NFTSchema);
