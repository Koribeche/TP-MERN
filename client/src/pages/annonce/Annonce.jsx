import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import FormAnnonce from "./FormAnnonce";
import ListAnnonce from "./ListAnnonce";

export default function Annonce() {
  const { token } = useContext(AuthContext);

  const [annonces, setannonces] = useState([]);
  const [id, setid] = useState("");
  const [nom, setnom] = useState("");
  const [prix, setprix] = useState("");
  const [description, setdescription] = useState("");
  const [photo, setphoto] = useState("");
  const [qteDispo, setqteDispo] = useState("");

  return (
    <div>
      <FormAnnonce
        token={token}
        annonces={annonces}
        setannonces={setannonces}
        nom={nom}
        setnom={setnom}
        prix={prix}
        setprix={setprix}
        qteDispo={qteDispo}
        setqteDispo={setqteDispo}
        description={description}
        setdescription={setdescription}
        photo={photo}
        setphoto={setphoto}
        id={id}
        setid={setid}
      />
      <ListAnnonce
        token={token}
        annonces={annonces}
        setannonces={setannonces}
        setnom={setnom}
        setprix={setprix}
        setqteDispo={setqteDispo}
        setdescription={setdescription}
        setphoto={setphoto}
        setid={setid}
      />
    </div>
  );
}
