import { Response, Request } from 'express';
import { deCrypt } from '../helpers/encript';
import Usuario from '../models/user';

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
    const validPassword = deCrypt( user.password );
    if (validPassword !== password) {
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
