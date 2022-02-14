import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';

import Usuario from "../models/user";

export const validarAuth = async (req:Request, resp:Response, next:NextFunction) => {
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
    //TODO: Terminar la sincronizacion de bcrypt para verificar la autenticidad
    console.log(existeEmail?.get().password)
    if (!existeEmail) {
      return resp.status(400).json({
        msg: 'Revisa tu Email o usuario'
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
