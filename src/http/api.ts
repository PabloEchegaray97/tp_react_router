import axios from 'axios';
import { ICurso } from '../types/models';

const API_URL = 'http://localhost:3000'; // json-server corre en el puerto 3000

export const getCursos = async (): Promise<ICurso[]> => {
    try {
        const response = await axios.get<ICurso[]>(`${API_URL}/cursos`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cursos:", error);
        throw error;
    }
};

// obtener un curso específico por ID
export const getCursoById = async (id: number): Promise<ICurso | null> => {
    try {
        // json-server devuelve un array vacío si no encuentra el ID, o un array con un elemento si lo encuentra
        // hacemos la petición y tomamos el primer elemento si existe
        const response = await axios.get<ICurso[]>(`${API_URL}/cursos?id=${id}`);
        return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
        // si ocurre un error en la petición (ej: red), lo logueamos y retornamos null
        console.error(`Error fetching curso with id ${id}:`, error);
        return null; // retornar null en caso de error permite manejarlo en el componente
    }
}; 