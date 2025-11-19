const db = require("../models");
const Cliente = db.clientes;

// Crear cliente (POST)
exports.crear = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.json(cliente);
  } catch (err) {
    console.log("❌ ERROR crear cliente:", err);
    res.status(500).json({ error: "Error al crear el cliente" });
  }
};

// Listar clientes (GET)
exports.listar = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
};

// Actualizar cliente (PUT)
exports.actualizar = async (req, res) => {
  try {
    const id = req.params.id;
    await Cliente.update(req.body, { where: { id } });
    res.json({ mensaje: "Cliente actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};

// Eliminar cliente por ID (DELETE)
exports.eliminar = async (req, res) => {
  try {
    const id = req.params.id;
    await Cliente.destroy({ where: { id } });
    res.json({ mensaje: "Cliente eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
};

// para eliminar cliente POR DNI (DELETE) para no hacerlo solo por ID
exports.eliminarPorDni = async (req, res) => {
  try {
    const dni = req.params.dni;

    const borrados = await Cliente.destroy({
      where: { dni: dni }
    });

    if (borrados === 0) {
      return res.status(404).json({
        mensaje: "No existe un cliente con ese DNI"
      });
    }

    res.json({ mensaje: "Cliente eliminado por DNI correctamente" });
  } catch (err) {
    console.error("❌ ERROR eliminando cliente por DNI:", err);
    res.status(500).json({ error: "Error al eliminar el cliente por DNI" });
  }
};
