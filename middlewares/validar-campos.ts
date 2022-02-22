import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import Usuario from "../models/user";

export const validarCampos = async (req:Request, resp:Response, next:NextFunction) => {
  
  const { body } = req;
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return resp.json(errors)
  }
  
  if (req.method === 'PUT') {
    const id = req.params.id
    try {
      const existeUser = await Usuario.findOne({
        where: {
          email: body.email,
          id
        }
      });
      // TODO: esto se puede mejorar con el token de acceso
      if (!existeUser) {
        return resp.status(400).json({
          msg: 'No tienes permisos para editar este usuario'
        })
      }
    } catch (error) {
      return resp.status(500).json({
        msg: 'Hable con el admin'
      })
    }
  }

  if (req.method === 'POST') {
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
      return resp.status(500).json({
        msg: 'Hable con el admin'
      })
    }
  }
  next();
}
