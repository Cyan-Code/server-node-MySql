import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";

import Usuario from "../models/user";

export const validarAuth = async (req:Request, resp:Response, next:NextFunction) => {
  const { email, password } = req.body;
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return resp.json(errors)
  }
  next();
}
