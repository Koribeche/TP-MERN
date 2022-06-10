import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Connexion() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const { settoken } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { email, password };
    axios
      .post("/user/login", user)
      .then((resultat) => {
        localStorage.setItem("token", resultat.data);
        settoken(resultat.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button> SE CONNECTER </button>
      </form>
    </div>
  );
}
