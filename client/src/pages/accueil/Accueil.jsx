import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Accueil() {
  const [annonces, setannonces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/annonce")
      .then((res) => setannonces(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      Accueil
      {annonces.map((annonce) => {
        return (
          <div key={annonce._id}>
            <p> Nom: {annonce.nom} </p>
            <p> prix: {annonce.prix} </p>
            <p> Quantité disponible: {annonce.qteDispo} </p>
            <p> description: {annonce.description} </p>
            <button onClick={() => navigate(`/annonce/${annonce._id}`)}>
              Détails
            </button>
          </div>
        );
      })}
    </div>
  );
}
