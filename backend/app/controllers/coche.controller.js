// Controlador de Coches
//logica del controlador de coches

const db = require("../models");
const Coche = db.coches;
const path = require("path");

// Crear coche (POST)
exports.crear = async (req, res) => {
    try {
        const coche = await Coche.create(req.body);
        res.json(coche);
    } catch (err) {
        console.error("❌ ERROR en creación de coche:", err);
        res.status(500).json({ error: "Error al crear el coche" });
    }
};

// Listar coches (GET)
exports.listar = async (req, res) => {
    try {
        const coches = await Coche.findAll();
        res.json(coches);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los coches" });
    }
};

// Actualizar coche (PUT)
exports.actualizar = async (req, res) => {
    try {
        const id = req.params.id;
        await Coche.update(req.body, { where: { id } });
        res.json({ mensaje: "Coche actualizado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar el coche" });
    }
};

// Eliminar coche por ID (DELETE)
exports.eliminar = async (req, res) => {
    try {
        const id = req.params.id;
        await Coche.destroy({ where: { id } });
        res.json({ mensaje: "Coche eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar el coche" });
    }
};

// Eliminar coche POR MATRÍCULA (DELETE)
exports.eliminarPorMatricula = async (req, res) => {
    try {
        const matricula = req.params.matricula;

        const borrados = await Coche.destroy({
            where: { matricula }
        });

        if (borrados === 0) {
            return res.status(404).json({
                mensaje: "No existe un coche con esa matrícula"
            });
        }

        res.json({ mensaje: "Coche eliminado por matrícula correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar el coche por matrícula" });
    }
};

// SUBIR FOTO DEL COCHE
exports.subirFoto = async (req, res) => {
    try {

        console.log("📸 Archivo recibido:", req.file);

        if (!req.file) {
            return res.status(400).json({ error: "No se envió ninguna imagen" });
        }

        const id = req.params.id;

        await Coche.update(
            { foto: req.file.filename },
            { where: { id } }
        );

        res.json({
            mensaje: "Foto subida correctamente",
            archivo: req.file.filename
        });

    } catch (err) {
        console.error("❌ ERROR subiendo foto del coche:", err);
        res.status(500).json({ error: "Error al subir la foto del coche" });
    }
};
