import { Routes, Route, Navigate } from 'react-router-dom';
import { CursosScreen } from '../components/screens/CursosScreen';
import { EstudiantesScreen } from '../components/screens/EstudiantesScreen';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/cursos" element={<CursosScreen />} />
            <Route path="/estudiantes" element={<EstudiantesScreen />} />
            {/* redirigir cualquier ruta no definida a /cursos */}
            <Route path="*" element={<Navigate to="/cursos" replace />} />
        </Routes>
    );
}; 