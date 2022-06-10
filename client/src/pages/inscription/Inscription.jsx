import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";

export default function Inscription() {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    seterror(false);
    event.preventDefault();
    const user = { fullname, email, password };
    setloading(true);
    axios
      .post("/user/register", user)
      .then(() => navigate("/connexion"))
      .catch((erreur) => seterror(true))
      .finally(() => setloading(false));
  };

  return (
    <div>
      {loading && <Spinner />}
      {error && <h1> l'email existe déja </h1>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Fullname"
          value={fullname}
          onChange={(event) => setfullname(event.target.value)}
        />
        <br />
        <br />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => setemail(event.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => setpassword(event.target.value)}
        />
        <br />
        <br />
        <button> S'inscrire </button>
      </form>
    </div>
  );
}
