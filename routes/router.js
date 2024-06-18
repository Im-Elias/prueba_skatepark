import { Router } from "express";
import {
  index,
  login,
  signup,
  profile,
  addSkater,
} from "../controllers/controller.js";

const router = Router();

router.get("/", index);

router.get("/login", login);

router.get("/signup", signup);

router.get("/profile", profile);

router.post("/add-skater", addSkater);

export default router;
