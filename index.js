import express from "express";
import expressFileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import router from "./routes/router.js";

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static filesç
app.use(express.static("public"));

// file upload config
app.use(
  expressFileUpload({
    limits: { fileSize: 1000000 },
    responseOnLimit: "El archivo es demasiado grande",
    abortOnLimit: true,
  })
);

//hbs config
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");

//routes
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
