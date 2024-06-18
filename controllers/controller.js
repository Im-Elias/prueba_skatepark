import { v4 as uuidv4 } from "uuid";
import {
  getSkatersQuery,
  addSkaterQuery,
  checkIfSkaterExistsQuery,
  updateSkaterQuery,
  deleteSkaterQuery,
} from "../models/queries.js";
import jwt from "jsonwebtoken";
import fs from "fs";

export const index = async (req, res) => {
  res.render("index", {
    tittle: "Home Page",
    skaters: await getSkatersQuery(),
  });
};

export const admin = async (req, res) => {
  res.render("admin", {
    tittle: "Admin Page",
    skaters: await getSkatersQuery(),
  });
};

export const login = (req, res) => {
  res.render("login", {
    tittle: "Login Page",
  });
};

export const signup = (req, res) => {
  res.render("signup", {
    tittle: "Signup Page",
  });
};

export const profile = async (req, res) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;

    const token = req.cookies.token;
    const { email } = jwt.verify(token, secretKey);
    if (!email) {
      return res
        .status(401)
        .send({ error: "401 Unauthorized", message: "No token" });
    }

    const skater = await checkIfSkaterExistsQuery(email);

    res.render("profile", { skater: skater[0], tittle: "Profile Page" });
  } catch (error) {}
};

export const addSkater = async (req, res) => {
  try {
    const { email, name, password, years, speciality } = req.body;

    const { photo } = req.files;
    const imgName = uuidv4().slice(0, 8);
    const imgUrl = `/fotos/${imgName}.png`;

    photo.mv(`./public/fotos/${imgName}.png`);

    await addSkaterQuery(email, name, password, years, speciality, imgUrl);

    res.status(201).redirect("/login");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const logIn = async (req, res) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  try {
    const { email, password } = req.body;
    //check if the user exists
    const skater = await checkIfSkaterExistsQuery(email);
    if (!skater || skater[0].password !== password) {
      return res.status(401).send(`<p>Invalid Credentials</p>
                                   <a href="/login"> Go back to login</a>`);
    }

    //create a token
    const token = jwt.sign({ email }, secretKey, { expiresIn: "2m" });

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 120000,
      })
      .redirect("/profile");
  } catch (error) {
    console.log("error", error.message);
  }
};

export const updateOrDeleteSkater = async (req, res) => {
  try {
    const { email, name, password, years, speciality, action } = req.body;
    const skater = await checkIfSkaterExistsQuery(email);

    if (action === "delete") {
      await deleteSkaterQuery(email);

      const imgPath = `./public${skater[0].foto}`;
      fs.unlinkSync(imgPath);

      return res.status(200).redirect("/");
    } else if (action === "update") {
      await updateSkaterQuery(email, name, password, years, speciality);
      return res.status(200).redirect("/profile");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
