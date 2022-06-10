import React, { useEffect } from "react";
import axios from "axios";

export default function ListAnnonce({
  token,
  annonces,
  setannonces,
  setnom,
  setprix,
  setdescription,
  setqteDispo,
  setphoto,
  setid,
}) {
  // récuperer les annonces DE L'UTILISATEUR CONNECTER
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("/annonce/getAnnonceUser", config)
      .then((res) => setannonces(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Supprimer une annonce
  const deleteAnnonce = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`/annonce/${id}`, config)
      .then((res) => {
        // tmp = annonces.filter((annonce) => annonce._id != id);
        // setannonces(tmp);
        setannonces(annonces.filter((annonce) => annonce._id !== id));
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  // mise à jours du formulaire
  const updateForm = (annonce) => {
    setnom(annonce.nom);
    setprix(annonce.prix);
    setdescription(annonce.description);
    setphoto(annonce.photo);
    setqteDispo(annonce.qteDispo);
    setid(annonce._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div>
        {annonces.map((annonce) => {
          return (
            <div key={annonce._id}>
              <p> Nom: {annonce.nom} </p>
              <p> prix: {annonce.prix} </p>
              <p> Quantité disponible: {annonce.qteDispo} </p>
              <p> description: {annonce.description} </p>
              <button onClick={() => deleteAnnonce(annonce._id)}>Delete</button>
              <button onClick={() => updateForm(annonce)}> Update </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
