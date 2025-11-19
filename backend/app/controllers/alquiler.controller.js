// Controlador de Alquileres
// Aquí gestiono toda la lógica de creación, lectura, actualización y eliminación
// de los alquileres, incluyendo el cálculo automático del precio total.

const db = require("../models");
const Alquiler = db.alquileres;
const Coche = db.coches;       // Necesario para saber el precio por día
const Cliente = db.clientes;   // Para comprobar que el cliente existe

// Función auxiliar → calcula días entre 2 fechas
function calcularDias(fecha_inicio, fecha_fin) {
    const inicio = new Date(fecha_inicio);
    const fin = new Date(fecha_fin);

    // Diferencia en milisegundos → días
    const diff = Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1; // mínimo 1 día
}

// =======================================================
//  CREAR ALQUILER (POST)
// =======================================================
exports.crear = async (req, res) => {
    try {
        const { clienteId, cocheId, fecha_inicio, fecha_fin } = req.body;

        // 1️⃣ Verificar que el cliente existe
        const cliente = await Cliente.findByPk(clienteId);
        if (!cliente) {
            return res.status(400).json({ error: "El cliente no existe" });
        }

        // 2️⃣ Verificar que el coche existe
        const coche = await Coche.findByPk(cocheId);
        if (!coche) {
            return res.status(400).json({ error: "El coche no existe" });
        }

        // 3️⃣ Calcular precio_total → precio_dia × días alquilados
        const dias = calcularDias(fecha_inicio, fecha_fin);
        const precio_total = dias * coche.precio_dia;

        // 4️⃣ Crear alquiler (incluyo precio_total)
        const alquiler = await Alquiler.create({
            ...req.body,
            precio_total
        });

        res.json(alquiler);

    } catch (err) {
        console.log("❌ ERROR al crear alquiler:", err);
        res.status(500).json({ error: "Error al crear el alquiler" });
    }
};

// =======================================================
//  LISTAR ALQUILERES (GET)
// =======================================================
exports.listar = async (req, res) => {
    try {
        const alquilers = await Alquiler.findAll();
        res.json(alquilers);
    } catch (err) {
        console.log("❌ Error obteniendo alquileres:", err);
        res.status(500).json({ error: "Error al obtener los alquileres" });
    }
};

// =======================================================
//  ACTUALIZAR ALQUILER (PUT)
// =======================================================
exports.actualizar = async (req, res) => {
    try {
        const id = req.params.id;

        const { fecha_inicio, fecha_fin, cocheId } = req.body;

        // 1️⃣ Buscar coche para recalcular precio_total
        const coche = await Coche.findByPk(cocheId);
        if (!coche) {
            return res.status(400).json({ error: "El coche no existe" });
        }

        // 2️⃣ Recalcular precio_total
        const dias = calcularDias(fecha_inicio, fecha_fin);
        const precio_total = dias * coche.precio_dia;

        // 3️⃣ Actualizar alquiler
        await Alquiler.update(
            { ...req.body, precio_total },
            { where: { id } }
        );

        res.json({ mensaje: "Alquiler actualizado correctamente" });

    } catch (err) {
        console.log("❌ ERROR al actualizar alquiler:", err);
        res.status(500).json({ error: "Error al actualizar el alquiler" });
    }
};

// =======================================================
//  ELIMINAR ALQUILER (DELETE)
// =======================================================
exports.eliminar = async (req, res) => {
    try {
        const id = req.params.id;

        await Alquiler.destroy({ where: { id } });

        res.json({ mensaje: "Alquiler eliminado correctamente" });

    } catch (err) {
        console.log("❌ ERROR al eliminar alquiler:", err);
        res.status(500).json({ error: "Error al eliminar el alquiler" });
    }
};
