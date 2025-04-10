# Aplicación de Gestión de Cursos y Estudiantes

## 📝 Descripción
Aplicación web desarrollada en React que permite visualizar cursos y sus estudiantes asociados, consumiendo datos desde un JSON Server. Implementa rutas dinámicas y query params para mantener la persistencia de las vistas.

## ⚡ Funcionalidades Principales

### Vista de Cursos (/cursos)
- Listado de cursos disponibles en formato de tarjetas
- Cada tarjeta muestra:
  - Nombre del curso
  - Cantidad total de alumnos
  - Botón para ver estudiantes del curso

### Vista de Estudiantes (/estudiantes?curso=ID) 
- Muestra los estudiantes filtrados por curso seleccionado
- Mantiene el curso activo al recargar la página
- Manejo de estado cuando no hay curso seleccionado

## 🛠️ Tecnologías Utilizadas
- React con TypeScript
- React Router DOM v6 
- Fetch API para consumo de datos
- JSON Server como backend
- 
## 🚀 Instalación

1. Clonar el repositorio
```bash
git clone [URL_REPOSITORIO]
```

2. Instalar dependencias
```bash
npm install
```

3. Iniciar JSON Server
```bash
npm run dbDev
```

4. Iniciar aplicación
```bash
npm run dev
```

### 🔧 Características Técnicas
- Uso de Hooks (useEffect, useState)
- Implementación de React Router para navegación
- Query params para persistencia de datos
- Diseño responsive
- Manejo de estados y efectos
