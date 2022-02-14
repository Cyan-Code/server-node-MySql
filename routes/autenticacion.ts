import { Router } from "express";
import {check} from 'express-validator';
import { autenticacion } from "../controllers/autenticacion";

const router = Router();

router.post('/login',[
  check('nombre').notEmpty(),
  check('password').notEmpty(),
],autenticacion);

export default router;
