// Rutas de Clientes
// Aquí conecto las rutas HTTP con las funciones del controlador.

const authJwt = require("../middleware/authJwt");

module.exports = app => {
    const clientes = require("../controllers/cliente.controller.js");

    app.post("/clientes", authJwt, clientes.crear);            // Crear cliente
    app.get("/clientes", authJwt, clientes.listar);            // Listar clientes
    app.put("/clientes/:id", authJwt, clientes.actualizar);    // Actualizar cliente
    app.delete("/clientes/:id", authJwt, clientes.eliminar);   // Eliminar cliente
    app.delete("/clientes/dni/:dni", authJwt, clientes.eliminarPorDni); //Eliminar por DNI
};
