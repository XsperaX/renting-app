// Rutas de alquileres.
// Aquí conecto las rutas HTTP con las funciones del controlador.

const authJwt = require("../middleware/authJwt");

module.exports = app => {
    const alquiler = require("../controllers/alquiler.controller.js");

    app.post("/alquilers", authJwt, alquiler.crear);
    app.get("/alquilers", authJwt, alquiler.listar);
    app.put("/alquilers/:id", authJwt, alquiler.actualizar);
    app.delete("/alquilers/:id", authJwt, alquiler.eliminar);
};
