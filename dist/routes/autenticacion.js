"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const autenticacion_1 = require("../controllers/autenticacion");
const validar_auth_1 = require("../middlewares/validar-auth");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').notEmpty(),
    validar_auth_1.validarAuth
], autenticacion_1.autenticacion);
exports.default = router;
//# sourceMappingURL=autenticacion.js.map