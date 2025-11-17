import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
})

// Colaboradores
export const getColaboradores = () => api.get("/colaborador/traerColaboradores");
export const createColaborador = (data) => api.post("/colaborador/crearcolaborador", data);
export const updateColaborador = (empleado_id, data) => api.put(`/colaborador/actualizarColaborador/${empleado_id}`, data);

// Empresas
export const getEmpresas = () => api.get("/empresa/traerTodasEmpresas");
export const createEmpresa = (data) => api.post("/empresa/crearEmpresa", data);
export const updateEmpresa = (empresa_id, data) => api.put(`/empresa/actualizarEmpresa/${empresa_id}`, data);

// Ubicacion
export const getMunicipios = () => api.get("/location/getAllMunicipios");
export const getDepartamentos = () => api.get("/location/getAllDepartamentos");
export const getPaises = () => api.get("/location/getAllCountries");

export const createPais = (data) => api.post("/location/crearPais", data);
export const createDepto = (data) => api.post("/location/crearDepartamento", data);
export const createMunicipio = (data) => api.post("/location/crearMunicipio", data);

export const updatePais = (pais_id, data) => api.put(`/location/actualizarPais/${pais_id}`, data);
export const updateDepto = (departamento_id, data) => api.put(`/location/actualizarDepartamento/${departamento_id}`, data);
export const updateMuni = (municipio_id, data) => api.put(`/location/actualizarMunicipio/${municipio_id}`, data);

export const borrarPais = (pais_id, data) => api.put(`/location/borrarPais/${pais_id}`, data);
export const borrarDepto= (departamento_id, data) => api.put(`/location/borrarDepartamento/${departamento_id}`, data);
export const borrarMun = (municipio_id, data) => api.put(`/location/borrarMunicipio/${municipio_id}`, data);



export default api;