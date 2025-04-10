import { IEstudiante } from '../../types/models';
import styles from './EstudianteCard.module.css';

//EstudianteCardProps es un tipo que se encarga de recibir los datos de un estudiante
interface EstudianteCardProps {
  estudiante: IEstudiante;
}
//EstudianteCard es un componente que se encarga de mostrar los datos de un estudiante en una tarjeta
//recibe como prop el estudiante y lo desestructura para obtener los datos de nombre, id y edad
export const EstudianteCard = ({ estudiante }: EstudianteCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{estudiante.nombre}</h3>
        <span className={styles.id}>ID: {estudiante.id}</span>
      </div>
      <div className={styles.content}>
        <p>Edad: {estudiante.edad}</p>
      </div>
    </div>
  );
};
