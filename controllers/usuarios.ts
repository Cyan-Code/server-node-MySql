import { Response, Request } from "express";
import Usuario from "../models/user";

export const getUsuarios = async (req:Request, res:Response) => {
  const usuarios = await Usuario.findAll();
  res.json({
    usuarios
  })
}

export const getUsuario = async (req:Request, res:Response) => {

  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (usuario) {
    return res.json(usuario)
  } else {
    return res.status(404).json({
      msg: `No existe un usuario con el ${id}`
    })
  }
}

export const postUsuario = async (req:Request, res:Response) => {
  const { body } = req;
  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email
      }
    })
    if (existeEmail) {
      return res.status(400).json({
        msg: 'Ya existe un usuario con el email'
      })
    }
    const usuario = new Usuario(body)
    await usuario.save();
    return res.json(usuario)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }

}

export const updatedUsuario = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const idUserExist = await Usuario.findByPk(id);
    if(!idUserExist){
      return res.status(404).json({
        msg:'No existe un usuario con el ID' + id
      })
    }
    await idUserExist.update(body)
    return res.json(idUserExist)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

export const deleteUsuario = async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const idUserExist = await Usuario.findByPk(id);
    if(!idUserExist){
      return res.status(404).json({
        msg:'No existe un usuario con el ID' + id
      })
    }
    await idUserExist.update({estado: false})
    return res.json(idUserExist)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}




