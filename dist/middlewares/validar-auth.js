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
exports.validarAuth = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const validarAuth = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return resp.json(errors);
    }
    try {
        const existeEmail = yield user_1.default.findOne({
            where: {
                email: body.email,
            }
        });
        //TODO: Terminar la sincronizacion de bcrypt para verificar la autenticidad
        console.log(existeEmail === null || existeEmail === void 0 ? void 0 : existeEmail.get().password);
        if (!existeEmail) {
            return resp.status(400).json({
                msg: 'Revisa tu Email o usuario'
            });
        }
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            msg: 'Hable con el admin'
        });
    }
    next();
});
exports.validarAuth = validarAuth;
//# sourceMappingURL=validar-auth.js.map