const express = require("express");
const router = express.Router();
const Annonce = require("../model/Annonce");
const auth = require("../middleware/auth");

// const authAdmin = require("../middleware/auth-admin");
// Exemple comment on peut utiliser des roles dans l'application
// router.post("/admin", authAdmin, async (req, res) => {
//   res.json("vous etes admin");
// });

// Créer une nouvelle annonce
router.post("/", auth, async (req, res) => {
  try {
    req.body.idUser = req.payload.id;
    const annonce = new Annonce(req.body);
    const newAnnonce = await annonce.save();
    res.status(201).json(newAnnonce);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Récuperer toutes les annonces du site
router.get("/", async (req, res) => {
  try {
    const annonces = await Annonce.find();
    res.json(annonces);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Récuperer les annonces du user connecté
router.get("/getAnnonceUser", auth, async (req, res) => {
  try {
    // const annonces = await Annonce.find()
    //   .where("idUser")
    //   .equals(req.payload.id);
    const annonces = await Annonce.find({ idUser: req.payload.id });
    res.json(annonces);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Récuperer une annonce avec son id
router.get("/:id", async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);

    if (!annonce) {
      return res.status(404).json("l'annonce n'existe pas");
    }

    res.json(annonce);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Supprime un annonce avec son id
router.delete("/:id", auth, async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);

    if (!annonce) {
      return res.status(404).json("l'annonce n'existe pas");
    }

    if (annonce.idUser != req.payload.id) {
      return res.status(401).json("l'annonce ne vous appartient pas!");
    }

    await annonce.remove();
    res.json(annonce);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// mettre à jours une annonce avec son id
router.put("/:id", auth, async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);

    if (!annonce) {
      return res.status(404).json("l'annonce n'existe pas");
    }

    if (annonce.idUser != req.payload.id) {
      return res.status(401).json("l'annonce ne vous appartient pas!");
    }

    annonce.nom = req.body.nom;
    annonce.prix = req.body.prix;
    annonce.description = req.body.description;
    annonce.photo = req.body.photo;
    annonce.qteDispo = req.body.qteDispo;

    await annonce.save();
    res.json(annonce);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
