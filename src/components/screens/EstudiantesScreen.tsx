import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getCursoById } from '../../http/api';
import { ICurso } from '../../types/models';
import { EstudianteCard } from '../ui/EstudianteCard';
import styles from './Screens.module.css';

export const EstudiantesScreen = () => {
    const [searchParams] = useSearchParams();
    const cursoIdParam = searchParams.get('curso');
    const navigate = useNavigate();
    const [curso, setCurso] = useState<ICurso | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        //fetchCursoData es una funcion asincrona que se encarga de obtener los datos del curso
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
        //se ejecuta la funcion fetchCursoData si el cursoIdParam cambia o se renderiza el componente
        fetchCursoData();
    }, [cursoIdParam]);
    //ordenar estudiantes por nombre para que se muestren alfabeticamente
    const sortedEstudiantes = useMemo(() => {
        if (!curso || !curso.estudiantes) {
            return [];
        }
        return [...curso.estudiantes].sort((a, b) => a.nombre.localeCompare(b.nombre));
    }, [curso]);

    if (loading) return <div className={styles.container}>Cargando estudiantes...</div>;
    if (error) return <div className={styles.container}>{error}</div>;
    //si no se encuentra el curso, se muestra un mensaje
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
                <div className={styles.grid}>
                    {sortedEstudiantes.map(est => (
                        //pasamos el estudiante como prop a EstudianteCard y le pasamos el key para que se renderice correctamente
                        <EstudianteCard key={est.id} estudiante={est} />
                    ))}
                </div>
                </>
            ) : (
                <p>No hay estudiantes registrados en este curso.</p>
            )}
        </div>
    );
}; 