"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.deleteUsuario = exports.updatedUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const express_validator_1 = require("express-validator");
const encript_1 = require("../helpers/encript");
const user_1 = __importDefault(require("../models/user"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield user_1.default.findAll({
        where: {
            estado: true
        }
    });
    res.json({
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield user_1.default.findByPk(id);
    if (usuario) {
        return res.json(usuario);
    }
    else {
        return res.status(404).json({
            msg: `No existe un usuario con el ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { nombre, email } = req.body;
    body.password = (0, encript_1.encript)(body.password);
    const passwordDecrypt = (0, encript_1.deCrypt)(body.password);
    try {
        const usuario = new user_1.default(body);
        yield usuario.save();
        return res.json({
            state: 'ok',
            msg: 'usuario grabado exitosamente',
            nombre,
            email,
            passwordDecrypt
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
const updatedUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const idUserExist = yield user_1.default.findByPk(id);
        if (!idUserExist) {
            return res.status(404).json({
                msg: 'No existe un usuario con el ID' + id
            });
        }
        body.password = (0, encript_1.encript)(body.password);
        yield idUserExist.update(body);
        return res.json(idUserExist);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.updatedUsuario = updatedUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const idUserExist = yield user_1.default.findByPk(id);
        if (!idUserExist) {
            return res.status(404).json({
                msg: 'No existe un usuario con el ID' + id
            });
        }
        yield idUserExist.update({ estado: false });
        return res.json(idUserExist);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.deleteUsuario = deleteUsuario;
const deleteAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(404).json(errors);
    }
    const deleteAll = yield user_1.default.findAll({
        where: {
            estado: true
        }
    });
    deleteAll.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
        yield user.update({ estado: false });
    }));
    return res.json(deleteAll);
});
exports.deleteAllUsers = deleteAllUsers;
//# sourceMappingURL=usuarios.js.map