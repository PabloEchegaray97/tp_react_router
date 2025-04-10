import { Link } from 'react-router-dom';
import { ICurso } from '../../types/models';
import styles from './CursoCard.module.css';

interface CursoCardProps {
    curso: ICurso;
}
//CursoCard es un componente que se encarga de mostrar los datos de un curso en una tarjeta
//recibe como prop el curso y lo desestructura para obtener los datos de nombre, id y estudiantes
export const CursoCard: React.FC<CursoCardProps> = ({ curso }) => {
    return (
        <div className={styles.card}>
            <h3>{curso.nombre}</h3>
            <p>Cantidad de Alumnos: {curso.estudiantes.length}</p>
            <Link to={`/estudiantes?curso=${curso.id}`} className="btn">
                Ver Estudiantes
            </Link>
        </div>
    );
}; 