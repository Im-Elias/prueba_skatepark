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

export const checkIfSkaterExistsQuery = async (email) => {
  try {
    const query = {
      text: "SELECT * FROM skaters WHERE email = $1",
      values: [email],
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

export const updateSkaterQuery = async (
  email,
  name,
  password,
  years,
  speciality
) => {
  try {
    const query = {
      text: `UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 WHERE email = $5 RETURNING *`,
      values: [name, password, Number(years), speciality, email],
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

export const deleteSkaterQuery = async (email) => {
  try {
    const query = {
      text: `DELETE FROM skaters WHERE email = $1 RETURNING *`,
      values: [email],
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

export const setSkaterStateQuery = async (id, estado) => {
  try {
    const query = {
      text: `UPDATE skaters SET estado = $1 WHERE id = $2 RETURNING *`,
      values: [estado, id],
    };
    const response = await pool.query(query);

    if (response.rowCount > 0) {
      return response.rows;
    } else {
      return new Error("Skater wasn't updated");
    }
  } catch (error) {
    console.log("error.code: ", error.code, "\nerror.message: ", error.message);
  }
};
