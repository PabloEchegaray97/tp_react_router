import { useEffect, useState } from 'react';
import { getCursos } from '../../http/api';
import { ICurso } from '../../types/models';
import { CursoCard } from '../ui/CursoCard';
import styles from './Screens.module.css';

//CursosScreen es un componente que se encarga de mostrar los cursos disponibles
export const CursosScreen = () => {
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        //fetchCursos es una funcion asincrona que se encarga de obtener los datos de los cursos
        const fetchCursos = async () => {
            try {
                setLoading(true);
                const data = await getCursos();
                //se setean los cursos y se limpia el error
                setCursos(data);
                setError(null);
            } catch (err) {
                setError('Error al cargar los cursos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCursos();
    }, []);
    //si esta cargando, se muestra un mensaje
    if (loading) return <div className={styles.container}>Cargando cursos...</div>;
    //si hay un error, se muestra un mensaje
    if (error) return <div className={styles.container}>{error}</div>;

    return (
        <div className={styles.container}>
            <h2>Cursos Disponibles</h2>
            <div className={styles.grid}>
                {cursos.map(curso => (
                    <CursoCard key={curso.id} curso={curso} />
                ))}
            </div>
        </div>
    );
}; 