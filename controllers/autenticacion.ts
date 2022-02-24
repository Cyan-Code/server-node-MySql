import { Response, Request } from "express";
import Usuario from "../models/user";
import bcrypt from 'bcrypt';

export const autenticacion = async(req:Request, resp:Response) => {
  const {email, password} = req.body
  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email: email,
        estado: true
      }
    })
    if (!existeEmail) {
      return resp.status(400).json({
        msg: 'Revisa tu Email o usuario'
      })
    }
    const user = existeEmail.toJSON()
    const validPassword = bcrypt.compareSync( password, user.password );
    
    if (!validPassword) {
      return resp.status(400).json({
        msg: 'Usuario / password no son correctas'
      })
    }

  } catch (error) {
    console.log(error)
    return resp.status(500).json({
      msg: 'Hable con el admin'
    })
  }
  return resp.json({
    msg: 'ok',
    email
  })
}
