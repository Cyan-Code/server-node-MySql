import { Router } from "express";
import { autenticacion } from "../controllers/autenticacion";

const router = Router();

router.post('/login',[
  
],autenticacion);

export default router;
