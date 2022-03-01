"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deCrypt = exports.encript = void 0;
const crypto_js_1 = __importStar(require("crypto-js"));
const encript = (pd, key = 'string') => {
    const pdCipher = crypto_js_1.AES.encrypt(pd, key);
    const password = pdCipher.toString();
    return password;
};
exports.encript = encript;
const deCrypt = (pdCrypt, key = 'string') => {
    const pdDecrypt = crypto_js_1.default.AES.decrypt(pdCrypt, key).toString(crypto_js_1.default.enc.Utf8);
    return pdDecrypt;
};
exports.deCrypt = deCrypt;
//# sourceMappingURL=encript.js.map