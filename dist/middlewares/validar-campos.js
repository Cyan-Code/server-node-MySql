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
exports.validarCampos = void 0;
const user_1 = __importDefault(require("../models/user"));
const validarCampos = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        if (!body.password || !body.name) {
            return resp.status(400).json({
                msg: 'Falta nombre o password'
            });
        }
        const existeEmail = yield user_1.default.findOne({
            where: {
                email: body.email,
            }
        });
        if (existeEmail) {
            return resp.status(400).json({
                msg: 'Ya existe un usuario con el email'
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
exports.validarCampos = validarCampos;
//# sourceMappingURL=validar-campos.js.map