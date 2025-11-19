# Renting App -- Proyecto Full Stack

### Autor: **Erico Pérez Cárdenes**

Aplicación Full Stack realizada como proyecto final del módulo
**Programación en Lenguajes de Gestión (PGL)**.\
Incluye backend en **Node.js + Express + MySQL**, frontend en **Ionic +
Angular**, autenticación completa, subida de imágenes, cámara
y CRUDs conectados a base de datos.

------------------------------------------------------------------------

## 📁 Enlaces del Proyecto

🔗 **Repositorio completo (Frontend + Backend + BD incluida):**\
https://github.com/XsperaX/renting-app

📄 **Base de datos incluida:** `rentingdatabase.sql`\
📂 **Estructura clara:** backend + frontend + SQL

------------------------------------------------------------------------

# 1️⃣ Backend (Node.js + Express + MySQL)

El backend implementa:

-   CRUD de **clientes**
-   CRUD de **coches**
-   CRUD de **alquileres**
-   CRUD de **usuarios** (login)
-   **JWT Bearer**
-   **Contraseñas encriptadas con bcrypt**
-   **Subida de imágenes** a `/uploads`
-   Middlewares de seguridad
-   API documentada en POSTMAN

📂 Estructura:

    backend/
     ├── app/
     │   ├── controllers/
     │   ├── models/
     │   ├── routes/
     │   └── middleware/
     ├── uploads/
     ├── index.js
     └── package.json

------------------------------------------------------------------------

# 2️⃣ Frontend (Ionic + Angular)

El frontend incluye:

-   CRUD completo de coches, clientes y alquileres\
-   Login + guard de rutas\
-   Token JWT en todas las peticiones\
-   Interfaz moderna con IonComponents\
-   Cámara integrada (Capacitor)\
-   Subida de imágenes al backend\
-   Varias páginas y módulos

📂 Estructura:

    frontend/
     ├── src/
     │   ├── app/
     │   ├── assets/
     │   ├── environments/
     │   └── theme/
     ├── capacitor.config.ts
     └── package.json

------------------------------------------------------------------------

# 🧪 Pruebas y Evidencias para Calificación (UT1, UT2, UT3, UT5)

Este proyecto incluye todos los requisitos:

## ✔️ UT1 -- API + POSTMAN + CRUD Backend

-   GET funcionando\
-   POST funcionando\
-   PUT funcionando\
-   DELETE funcionando\
-   Documentación de API en Postman\
-   Repositorio con README y BD subida

## ✔️ UT2 -- Componentes de Ionic + CRUDs adicionales

-   Uso real de múltiples componentes de Ionic\
-   CRUDs completos relacionados

## ✔️ UT3 -- Cámara + Fotos + CRUD con imágenes

-   Captura de fotos con cámara\
-   Gestión de imágenes en frontend\
-   Envío y guardado de fotos en backend (uploads/)

## ✔️ UT5 -- Autenticación

-   Login básico\
-   Token Bearer funcionando\
-   Contraseñas protegidas (bcrypt)

------------------------------------------------------------------------

# ▶️ Instalación y ejecución

### Backend

``` sh
cd backend
npm install
node index.js
```

### Frontend

``` sh
cd frontend
npm install
ionic serve
```

------------------------------------------------------------------------

# 🙋‍♂️ Autor

**Erico Pérez**\
Proyecto final de PGL -- Renting App
