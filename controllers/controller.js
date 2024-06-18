import { v4 as uuidv4 } from "uuid";
import { getSkatersQuery, addSkaterQuery } from "../models/queries.js";

export const index = async (req, res) => {
  res.render("index", {
    tittle: "Home Page",
    skaters: await getSkatersQuery(),
  });
};

export const login = (req, res) => {
  res.render("login");
};

export const signup = (req, res) => {
  res.render("signup");
};

export const profile = (req, res) => {
  res.render("profile");
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
