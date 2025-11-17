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


export default api;