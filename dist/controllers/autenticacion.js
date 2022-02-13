"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticacion = void 0;
const autenticacion = (req, resp) => {
    const { body } = req;
    return resp.json({
        msg: 'ok',
        body
    });
};
exports.autenticacion = autenticacion;
//# sourceMappingURL=autenticacion.js.map