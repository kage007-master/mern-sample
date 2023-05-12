import { Response, Request } from "express";
import BaseNFTModel from "../../db/models/BaseNFT";
import CustomNFTModel from "../../db/models/CustomNFT";
import { NFT } from "../../types";
import { getWords, calcPrice } from "../../utils";

export default {
  get: async (req: Request, res: Response): Promise<void> => {
    try {
      const base: NFT[] = await BaseNFTModel.find();
      const custom: NFT[] = await CustomNFTModel.find();
      res.status(200).json({ base, custom });
    } catch (error) {
      throw error;
    }
  },
  addInfo: async (req: Request, res: Response): Promise<void> => {
    try {
      var current = await CustomNFTModel.findOne({ name: req.body.base.name });
      if (!current) {
        current = new CustomNFTModel({ ...req.body.base, info: "" });
        await current.save();
      }
      var words = getWords(current.info);
      if (!current.info.length) words = [];
      words = words.concat(getWords(req.body.word));
      words.splice(10, words.length - 10);
      current.info = words.join(" ");
      current.value = calcPrice(req.body.base.value, words.length);
      await current.save();
      const nfts: NFT[] = await CustomNFTModel.find();
      res.status(200).json({ nfts });
    } catch (error) {
      throw error;
    }
  },
  removeInfo: async (req: Request, res: Response): Promise<void> => {
    try {
      const current = await CustomNFTModel.findOne({
        name: req.body.base.name,
      });
      if (current) {
        var words = getWords(current.info);
        words.splice(req.body.index, 1);
        if (words.length) {
          current.info = words.join(" ");
          current.value = calcPrice(req.body.base.value, words.length);
          await current.save();
        } else current.deleteOne();
      }
      const nfts: NFT[] = await CustomNFTModel.find();
      res.status(200).json({ nfts });
    } catch (error) {
      throw error;
    }
  },
};
