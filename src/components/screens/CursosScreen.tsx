import { useEffect, useState } from 'react';
import { getCursos } from '../../http/api';
import { ICurso } from '../../types/models';
import { CursoCard } from '../ui/CursoCard';
import styles from './Screens.module.css';

export const CursosScreen = () => {
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                setLoading(true);
                const data = await getCursos();
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

    if (loading) return <div className={styles.container}>Cargando cursos...</div>;
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