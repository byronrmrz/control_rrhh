import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home";
import Colabordores from "./pages/Colaboradores";
import Empresas from "./pages/empresas";

export default function App(){
  return(
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colaboradores" element={<Colabordores />} />  
          <Route path="/empresas" element={<Empresas />} />  

                  
        </Routes>
      </Layout>
    </Router>
  )
}