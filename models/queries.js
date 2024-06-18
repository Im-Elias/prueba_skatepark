import { pool } from "../config/db.config.js";

export const getSkatersQuery = async () => {
  try {
    const query = {
      text: "SELECT * FROM skaters",
    };
    const response = await pool.query(query);

    if (response.rowCount > 0) {
      return response.rows;
    } else {
      return new Error("No se encontraron skaters");
    }
  } catch (error) {
    console.log("error.code: ", error.code, "\nerror.message: ", error.message);
  }
};

export const addSkaterQuery = async (
  email,
  name,
  password,
  years,
  speciality,
  photo
) => {
  try {
    const query = {
      text: `INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      values: [email, name, password, years, speciality, photo, false],
    };
    const response = await pool.query(query);

    if (response.rowCount > 0) {
      return response.rows;
    } else {
      return new Error("No se registraron skaters");
    }
  } catch (error) {
    console.log("error.code: ", error.code, "\nerror.message: ", error.message);
  }
};
