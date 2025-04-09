import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getCursoById } from '../../http/api';
import { ICurso } from '../../types/models';
import styles from './Screens.module.css';

export const EstudiantesScreen = () => {
    const [searchParams] = useSearchParams();
    const cursoIdParam = searchParams.get('curso');
    const navigate = useNavigate();
    const [curso, setCurso] = useState<ICurso | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCursoData = async () => {
            if (!cursoIdParam) {
                setError('No se especificó un ID de curso.');
                setLoading(false);
                return;
            }

            const id = parseInt(cursoIdParam, 10);
            if (isNaN(id)) {
                setError('El ID del curso no es válido.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const cursoEncontrado = await getCursoById(id);

                if (cursoEncontrado) {
                    setCurso(cursoEncontrado);
                    setError(null);
                } else {
                    setError(`Curso con ID ${id} no encontrado.`);
                    setCurso(null);
                }
            } catch (err) {
                setError('Error al cargar los datos del curso.');
                console.error('Error fetching curso data:', err);
                setCurso(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCursoData();
    }, [cursoIdParam]);

    const sortedEstudiantes = useMemo(() => {
        if (!curso || !curso.estudiantes) {
            return [];
        }
        return [...curso.estudiantes].sort((a, b) => a.nombre.localeCompare(b.nombre));
    }, [curso]);

    if (loading) return <div className={styles.container}>Cargando estudiantes...</div>;
    if (error) return <div className={styles.container}>{error}</div>;
    if (!curso) return <div className={styles.container}>Curso no encontrado.</div>;

    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                <button className='btn outlined' onClick={() => navigate('/cursos')}>Volver a Cursos</button>
            </div>
            <h2 className={styles.mb_1}>Estudiantes de {curso.nombre}</h2>
            {sortedEstudiantes.length > 0 ? (
                <>
                <div className={styles.info}>
                    <p>Total de estudiantes: {sortedEstudiantes.length}</p>
                    <p>Curso ID: {curso.id}</p>
                    </div>
                <ul className={styles.list}>
                    {sortedEstudiantes.map(est => (
                        <li key={est.id}>
                            ID: {est.id} - {est.nombre} (Edad: {est.edad})
                        </li>
                    ))}
                </ul>
                </>
            ) : (
                <p>No hay estudiantes registrados en este curso.</p>
            )}
        </div>
    );
}; 