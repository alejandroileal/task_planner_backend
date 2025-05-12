# 🔧 Devotion — Backend (Task Planner Pro)

**Devotion** es una API REST construida en **Node.js** con **Express**, diseñada para gestionar tareas, eventos, fotos y usuarios, y desarrollada como parte del proyecto final del módulo en **Evolve Academy** para el **Máster en Desarrollo Web & IA**. Este backend reemplaza el uso de `localStorage`, integrando una base de datos MongoDB, autenticación segura, subida de imágenes, WebSockets y envío de correos electrónicos automatizados.

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/alejandroileal/task_planner_backend
cd alejandroileal/task_planner_backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

Crea un archivo `.env` en la raíz con el siguiente contenido:

```
DB_USER=aleal1202
DB_PASSWORD=12345
JWT_SECRET=Alejandro
```

> Asegúrate de que `CLIENT_ORIGIN` coincida con la URL de tu frontend local.

### 4. Ejecutar el servidor

```bash
npm run dev
```

Es importante asegurarse que se esté desplegando en `localhost:3500`

---

## 📁 Estructura del proyecto

```
├── src/
│   ├── config/           # Configuración de la app (DB, email, socket)
│   ├── controllers/      # Lógica de control por entidad
│   ├── middlewares/      # JWT, roles, validaciones, errores
│   ├── models/           # Esquemas de Mongoose (usuarios, tareas, eventos, fotos)
│   ├── routes/           # Definición de endpoints agrupados
│   ├── services/         # Acceso a la base de datos y lógica de negocio
│   ├── utils/            # Funciones auxiliares como sockets o correo
│   ├── validations/      # Validaciones con express-validator
│   └── uploads/          # Carpeta donde se guardan las imágenes
├── app.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🧠 Funcionalidades principales

### ✅ Gestión de tareas y eventos

- CRUD completo para tareas y eventos.
- Filtros por estado (pendiente, en progreso, completada) o fecha.
- Validaciones integradas.
- Relación con el `userId` del creador.

### 🔐 Autenticación y roles

- Registro crea usuarios con rol `user` por defecto.
- El login genera un **JWT** que se guarda automáticamente en cookies seguras.
- Middleware `authenticate` acepta tanto **Bearer tokens** como cookies.
- Middleware `authorize` restringe rutas solo para administradores.
- Rutas protegidas con validación de permisos.

### 🖼️ Subida de fotos

- Gestión de archivos con **Multer**.
- Validación de tamaño y tipo (solo imágenes).
- Solo administradores pueden subir o eliminar fotos.
- Usuarios normales pueden visualizar la galería.

### 📡 WebSockets

- Notificaciones en tiempo real al crear/editar/eliminar tareas, eventos o fotos.
- Autenticación de sockets con JWT.
- Desconexiones correctamente gestionadas.

### 📬 Envío de correos

- **Correo de bienvenida** automático tras el registro.
- Implementado con **Nodemailer**.
- Confirmación por consola (`console.log`) para validar su envío.

---

## ⚙️ Stack y librerías clave

- **express** — Servidor web
- **mongoose** — ODM para MongoDB
- **bcrypt** — Hash de contraseñas
- **jsonwebtoken** — Tokens JWT
- **cookie-parser** — Soporte de cookies en peticiones
- **multer** — Subida de archivos
- **nodemailer** — Envío de correos
- **ws** — WebSocket nativo de Node
- **helmet, rate-limit, mongo-sanitize** — Seguridad
- **express-validator** — Validación de entradas

---

## 📌 Ejemplo de autenticación protegida

```http
GET /api/tasks
Authorization: Bearer <token>
Cookie: token=<token>
```

El middleware autenticará ya sea desde la cookie o desde el header Authorization.

---

## 🧪 Validaciones y errores

- Validaciones con `express-validator`.
- Manejo centralizado de errores.
- Códigos HTTP claros: `401 Unauthorized`, `403 Forbidden`, `400 Bad Request`, etc.

---

## 📬 Futuras mejoras

- Eliminar imágenes desde el frontend.
- Despliegue en servicios como Render o Railway.

---

## 👤 Autor

Desarrollado por **Alejandro Irastorza Leal**  
Proyecto final de módulo - **Máster en Desarrollo Web & IA**  
**Evolve Academy · 2025**
