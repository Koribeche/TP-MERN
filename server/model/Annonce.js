const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prix: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
    qteDispo: { type: Number, default: 1 },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Annonce", annonceSchema);
