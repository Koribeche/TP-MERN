import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

export default function Detail() {
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const [annonce, setannonce] = useState({
    nom: "",
    prix: "",
    description: "",
    qteDispo: "",
    photo: "",
  });

  useEffect(() => {
    seterror(false);
    setloading(true);
    axios
      .get(`/annonce/${id}`)
      .then((res) => setannonce(res.data))
      .catch((err) => seterror(true))
      .finally(() => setloading(false));
  }, []);

  return (
    <div>
      Detail
      {loading && <Spinner />}
      {error && <h1> l'annonce n'existe pas </h1>}
      <p> Nom: {annonce.nom} </p>
      <p> prix: {annonce.prix} </p>
      <p> Quantité disponible: {annonce.qteDispo} </p>
      <p> description: {annonce.description} </p>
    </div>
  );
}
