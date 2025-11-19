// Rutas de autenticación (login y creación de usuario admin)

module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");

    // Ruta para crear el usuario administrador "erico"
    app.post("/auth/crear-admin", usuario.crearAdmin);

    // Ruta de login
    app.post("/auth/login", usuario.login);
};
