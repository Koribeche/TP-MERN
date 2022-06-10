import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  const { token, settoken } = useContext(AuthContext);

  // on récupere le token du context
  // si on est connecté annonce et logout
  // si on n'est pas connecté, on affiche connexion et inscription

  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
  };

  // condition ? <cas_true> : <cas_false>

  return (
    <nav>
      <h1>
        <Link to="/"> Accueil </Link>
      </h1>
      {token !== "" ? (
        <>
          <Link to="/annonce"> Annonce </Link>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/connexion"> Connexion </Link>
          <Link to="/inscription"> Inscription </Link>
        </>
      )}
    </nav>
  );
}
