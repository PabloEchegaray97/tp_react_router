export interface IEstudiante {
    id: number;
    nombre: string;
    edad: number;
}

export interface ICurso {
    id: number;
    nombre: string;
    estudiantes: IEstudiante[];
} 