import { Router } from "express";
import {
  index,
  login,
  signup,
  profile,
  addSkater,
  logIn,
  updateOrDeleteSkater,
  admin,
} from "../controllers/controller.js";

const router = Router();

router.get("/", index);

router.get("/login", login);

router.get("/signup", signup);

router.get("/profile", profile);

router.post("/add-skater", addSkater);

router.post("/login", logIn);

router.post("/profile/", updateOrDeleteSkater);

router.get("/admin", admin);

export default router;
