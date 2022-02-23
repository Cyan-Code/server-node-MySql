"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', usuarios_1.getUsuario);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').notEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').notEmpty(),
    validar_campos_1.validarCampos
], usuarios_1.postUsuario);
router.put('/:id', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').notEmpty(),
    (0, express_validator_1.check)('email', 'Email en incorrecto formato').isEmail(),
    validar_campos_1.validarCampos
], usuarios_1.updatedUsuario);
router.delete('/:id', usuarios_1.deleteUsuario);
router.delete('/', [
    (0, express_validator_1.check)('confirmar', 'Debe de tener una confirmacion valida').toBoolean().equals('true')
], usuarios_1.deleteAllUsers);
exports.default = router;
//# sourceMappingURL=user.js.map