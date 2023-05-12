import { Router } from "express";
import { NFTController as Controller } from "../../controllers";

const router: Router = Router();

router.get("/", Controller.get);
router.post("/add", Controller.addInfo);
router.post("/remove", Controller.removeInfo);

export default router;
