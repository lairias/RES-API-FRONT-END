import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Importacion De Axios
import ClienteAxios from "./config/axios.js";

//Importacion de Componentes
import Pacientes from "./components/pacientes.jsx";
import NuevaCita from "./components/NuevaCita.jsx";
import Paciente from "./components/Paciente.jsx";
//Fin de Importaciones de Componest

function App() {
  //State de la app

  const [citas, GuardaCitas] = useState([]);

  useEffect(() => {
    // console.log('desde UseEffect');
    const consultarApi = () => {
      ClienteAxios.get("/pacientes")
        .then((respuesta) => {
          //cologar en el State las informacion de la APi
          GuardaCitas(respuesta.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    consultarApi();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={()=> <Pacientes citas = {citas} />} />
        <Route exact path="/nueva" component={NuevaCita} />
        <Route exact path="/cita/:id" component={Paciente} />
      </Switch>
    </Router>
  );
}

export default App;
