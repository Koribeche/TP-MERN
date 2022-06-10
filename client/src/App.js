import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import Accueil from "./pages/accueil/Accueil";
import Connexion from "./pages/connexion/Connexion";
import Inscription from "./pages/inscription/Inscription";
import Annonce from "./pages/annonce/Annonce";
import Navbar from "./components/Navbar";
import Detail from "./pages/detail/Detail";

export default function App() {
  const initToken = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  const [token, settoken] = useState(initToken);

  return (
    <div>
      <BrowserRouter>
        <AuthContext.Provider value={{ token, settoken }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/annonce" element={<Annonce />} />
            <Route path="/annonce/:id" element={<Detail />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}
