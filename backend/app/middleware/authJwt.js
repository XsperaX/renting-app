// Middleware de autenticación por Token Bearer  para completar el apartado de la utt5

const jwt = require("jsonwebtoken");
const JWT_SECRET = "CLAVE_PIRINEUS";

// Verifica que el usuario envía un token válido
verifyToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: "No se envió token" });
    }

    // Esperamos formato:  Bearer XXXXX
    const partes = authHeader.split(" ");
    if (partes.length !== 2 || partes[0] !== "Bearer") {
        return res.status(401).json({ error: "Formato de token inválido" });
    }

    const token = partes[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido o expirado" });
        }

        // Guardamos los datos del usuario en la request
        req.usuario = decoded;
        next();
    });
};

module.exports = verifyToken;
