import { Router } from "express";
import {check} from 'express-validator';
import { autenticacion } from "../controllers/autenticacion";
import { validarAuth } from "../middlewares/validar-auth";

const router = Router();

router.post('/login',[
  check('email', 'El email es obligatorio').notEmpty(),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  validarAuth
], autenticacion);

export default router;
