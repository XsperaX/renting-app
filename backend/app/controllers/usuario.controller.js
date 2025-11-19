// Controlador de Usuarios
// Aquí manejo el registro del usuario administrador y el login

const db = require("../models");
const Usuario = db.usuarios;

const bcrypt = require("bcryptjs");     // Para encriptar contraseñas
const jwt = require("jsonwebtoken");    // Para generar token JWT

// Clave secreta del token 
const JWT_SECRET = "CLAVE_PIRINEUS";

// =======================================================
//  CREAR USUARIO ADMIN
//  POST -> /auth/crear-admin
// =======================================================
exports.crearAdmin = async (req, res) => {
    try {
        const nombre = "erico";             // Usuario administrador
        const passwordPlano = "pirineus";   // Contraseña sin encriptar

        // Encriptar contraseña
        const passwordEncriptada = bcrypt.hashSync(passwordPlano, 10);

        // Crear usuario en BD
        const usuario = await Usuario.create({
            nombre,
            password: passwordEncriptada
        });

        res.json({
            mensaje: "Usuario administrador creado correctamente",
            usuario: usuario
        });

    } catch (err) {
        console.error("❌ ERROR creando admin:", err);
        res.status(500).json({ error: "No se pudo crear el administrador" });
    }
};

// =======================================================
//  LOGIN DEL ADMINISTRADOR
//  POST -> /auth/login
// =======================================================
exports.login = async (req, res) => {
    try {
        const { nombre, password } = req.body;

        const usuario = await Usuario.findOne({ where: { nombre } });

        if (!usuario) {
            return res.status(400).json({ error: "Usuario incorrecto" });
        }

        // Comparar contraseñas
        const valido = bcrypt.compareSync(password, usuario.password);

        if (!valido) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        // Crear token JWT válido por 24h
        const token = jwt.sign(
            { id: usuario.id, nombre: usuario.nombre },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            mensaje: "Login correcto",
            token
        });

    } catch (err) {
        console.error("❌ ERROR en login:", err);
        res.status(500).json({ error: "Error en el login" });
    }
};
