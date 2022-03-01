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
exports.autenticacion = void 0;
const encript_1 = require("../helpers/encript");
const user_1 = __importDefault(require("../models/user"));
const autenticacion = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existeEmail = yield user_1.default.findOne({
            where: {
                email: email,
                estado: true
            }
        });
        if (!existeEmail) {
            return resp.status(400).json({
                msg: 'Revisa tu Email o usuario'
            });
        }
        const user = existeEmail.toJSON();
        const validPassword = (0, encript_1.deCrypt)(user.password);
        if (validPassword !== password) {
            return resp.status(400).json({
                msg: 'Usuario / password no son correctas'
            });
        }
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            msg: 'Hable con el admin'
        });
    }
    return resp.json({
        msg: 'ok',
        email
    });
});
exports.autenticacion = autenticacion;
//# sourceMappingURL=autenticacion.js.map