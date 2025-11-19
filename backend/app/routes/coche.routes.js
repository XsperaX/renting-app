// Rutas de Coches
// Aquí conecto las rutas HTTP con las funciones del controlador.

const multer = require("multer");
const path = require("path");

// Middleware de autenticación (TOKEN BEARER)
const authJwt = require("../middleware/authJwt");

// Configuración de MULTER (subidas al backend /uploads/)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads/"));
    },
    filename: (req, file, cb) => {
        const nombreUnico = Date.now() + "-" + file.originalname.replace(/\s/g, "_");
        cb(null, nombreUnico);
    }
});

// Filtro: solo imágenes JPG, JPEG, PNG
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Formato no permitido"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = app => {

    const coches = require("../controllers/coche.controller.js");

    // CRUD protegidos
    app.post("/coches", authJwt, coches.crear);
    app.get("/coches", authJwt, coches.listar);
    app.put("/coches/:id", authJwt, coches.actualizar);
    app.delete("/coches/:id", authJwt, coches.eliminar);
    app.delete("/coches/matricula/:matricula", authJwt, coches.eliminarPorMatricula);

    // SUBIR FOTO
    app.post(
        "/coches/foto/:id",
        authJwt,
        upload.single("foto"),
        coches.subirFoto
    );
};
