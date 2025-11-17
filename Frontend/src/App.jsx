import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home";
import Colabordores from "./pages/Colaboradores";
import Empresas from "./pages/empresas";
import Locations from "./pages/Location";
import Pais from "./pages/pais";
import Departamento from "./pages/Departamentos";
import Municipio from "./pages/municipios";
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colaboradores" element={<Colabordores />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/pais" element={<Pais />} />
          <Route path="/departamento" element={<Departamento />} />
          <Route path="/municipio" element={<Municipio />} />
        </Routes>
      </Layout>
    </Router>
  );
}
