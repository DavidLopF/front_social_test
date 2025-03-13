# Red Social - Frontend

Este proyecto es una aplicación de red social desarrollada con React + TypeScript que permite a los usuarios compartir publicaciones, interactuar con contenido y gestionar perfiles.

## 🚀 Características

- 👤 Autenticación de usuarios (registro e inicio de sesión)
- 📝 Creación de publicaciones con texto e imágenes
- ❤️ Sistema de likes en publicaciones
- 💬 Sistema de comentarios
- 👤 Perfiles de usuario personalizables
- 🔒 Rutas protegidas para usuarios autenticados
- 🌙 Diseño oscuro moderno

## 🛠️ Tecnologías Utilizadas

- React + TypeScript
- Vite
- Tailwind CSS
- Axios para peticiones HTTP
- Zustand para manejo de estado
- React Router para navegación

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Backend de la aplicación en ejecución

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd frontend
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:3000/api
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

## 🔑 Variables de Entorno

- `VITE_API_URL`: URL base de la API del backend

## 📁 Estructura del Proyecto

```
src/
├── components/      # Componentes reutilizables
├── pages/          # Páginas de la aplicación
├── services/       # Servicios para llamadas a la API
├── store/          # Estado global con Zustand
├── types/          # Tipos de TypeScript
└── utils/          # Utilidades y helpers
```

## 🔐 Autenticación

La aplicación utiliza autenticación basada en tokens JWT. El token se almacena en el estado global y se envía en cada petición a través de un interceptor de Axios.

## 🎨 Estilos

Los estilos están implementados con Tailwind CSS, proporcionando un diseño moderno y responsivo. La aplicación incluye un tema oscuro por defecto.

## 📱 Funcionalidades Principales

### Publicaciones
- Crear publicaciones con título, contenido e imágenes
- Ver feed de publicaciones
- Dar like/unlike a publicaciones
- Comentar en publicaciones
- Eliminar publicaciones propias

### Perfil de Usuario
- Editar información del perfil
- Cambiar foto de perfil
- Actualizar correo y contraseña

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

## 📄 Licencia

[MIT](https://choosealicense.com/licenses/mit/)
