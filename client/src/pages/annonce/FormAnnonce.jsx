import React from "react";
import axios from "axios";

export default function FormAnnonce({
  token,
  annonces,
  setannonces,
  nom,
  setnom,
  prix,
  setprix,
  qteDispo,
  setqteDispo,
  description,
  setdescription,
  photo,
  setphoto,
  id,
  setid,
}) {
  // Créer une nouvelle annonce
  const createAnnonce = () => {
    const annonce = { nom, prix, description, photo, qteDispo };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("/annonce", annonce, config)
      .then((res) => {
        setannonces([res.data, ...annonces]);
        setnom("");
        setprix("");
        setdescription("");
        setphoto("");
        setqteDispo("");
      })
      .catch((err) => console.log(err));
  };

  // Update une annonce
  const updateAnnonce = () => {
    if (!id) {
      alert("veuillez saisir l'annonce a mettre à jours");
      return;
    }

    const annonce = { nom, prix, description, photo, qteDispo };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(`/annonce/${id}`, annonce, config)
      .then((res) => {
        const tmp = annonces.filter((annonce) => annonce._id !== id);
        setannonces([res.data, ...tmp]);
        setnom("");
        setprix("");
        setdescription("");
        setphoto("");
        setqteDispo("");
        setid("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="nom"
        value={nom}
        onChange={(e) => setnom(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="prix"
        value={prix}
        onChange={(e) => setprix(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="photo"
        value={photo}
        onChange={(e) => setphoto(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="qteDispo"
        value={qteDispo}
        onChange={(e) => setqteDispo(e.target.value)}
      />
      <br />
      <br />
      <button onClick={createAnnonce}> Créer l'annonce </button>
      <button onClick={updateAnnonce}> Update l'annonce </button>
    </div>
  );
}
