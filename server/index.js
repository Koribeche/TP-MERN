require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongodb://localhost:27017/ecommerce

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à la BD établie"))
  .catch((erreur) => console.log(erreur));

const userRoute = require("./routes/userRoute");
const annonceRoute = require("./routes/annonceRoute");

app.use("/user", userRoute);
app.use("/annonce", annonceRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("the server is running on port " + PORT));
