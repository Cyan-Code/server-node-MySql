import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import Usuario from "../models/user";

export const validarCampos = async (req:Request, resp:Response, next:NextFunction) => {
  const { body } = req;
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return resp.json(errors)
  }
  
  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email,
      }
    })
    if (existeEmail) {
      return resp.status(400).json({
        msg: 'Ya existe un usuario con el email'
      })
    }
  } catch (error) {
    console.log(error)
    return resp.status(500).json({
      msg: 'Hable con el admin'
    })
  }
  next();
}
