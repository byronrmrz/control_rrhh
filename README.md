# control_rrhh
Documentación del Proyecto: Gestión de Colaboradores

Descripción

Este proyecto permite al departamento de recursos humanos gestionar colaboradores y empresas en distintos países, departamentos y municipios.
Se implementa un CRUD completo para:
	•	Países
	•	Departamentos
	•	Municipios
	•	Empresas
	•	Colaboradores

ESTRUCTURA
Dividí el proyecto en Backend y Frontend.

BACKEND:
Tecnología: Node.js con Express.js
Middleware: para manejo de JSON y Cors.
Funciones principales: 
    CRUD paises, departamentos, municipios, empresas, colaboradores.
    Relaciones entre colaboradores y empresas.
    Manejo de errores y respuestas Json

Base de datos: MySQL incluye algunos datos para pruebas

FRONTEND
Tecnología: React.js con Vite
Runciones principales:
    Formularios y tablas para mostrar la información
    Integración con el Backend mediante API
    Diseño simple y funcional para el resgistro y consulta de colaboradores, empresas y locaciones
    Patrones de diseño tomados de página web: https://grupopdc.com/

Base de datos:
MySQL
contenido: Tablas necesarias para proyecto, así como datos de prueba.

Recomendación: se adjunta la base de datos en carpeta DOCS

Instrucciones de instalación:
Clonar este repositorio

git clone <https://github.com/byronrmrz/control_rrhh.git>


Backend:
```bash
cd backend
npm install
npm start
```


Frontend
```bash
cd frontend
npm install
npm run dev
```

Configuración de Base de datos:
Se sube .env para mejor uso
