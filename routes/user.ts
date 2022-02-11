import { Router } from "express";
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
router.post('/',
[
  validarCampos
],
postUsuario);
router.put('/:id',  updatedUsuario);
router.delete('/:id',  deleteUsuario);



export default router;