import { Router } from "express";
import {check} from 'express-validator';

import {
  deleteUsuario,
  getUsuario,
  getUsuarios,
  postUsuario,
  updatedUsuario
} from "../controllers/usuarios";

import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

router.get('/',     getUsuarios);
router.get('/:id',  getUsuario);

router.post('/',[
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  check('email', 'El email es obligatorio').notEmpty(),
  validarCampos
], postUsuario);

router.put('/:id',[
  validarCampos
],updatedUsuario);

router.delete('/:id',  deleteUsuario);



export default router;