import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { deCrypt, encript } from "../helpers/encript";
import Usuario from "../models/user";

export const getUsuarios = async (req:Request, res:Response) => {
  const usuarios = await Usuario.findAll({
    where: {
      estado: true
    }
  });
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
  const { nombre, email } = req.body;
  
  body.password = encript(body.password);
  const passwordDecrypt = deCrypt(body.password)
  
  try {
    const usuario = new Usuario(body)
    await usuario.save();
    return res.json({
      state: 'ok',
      msg: 'usuario grabado exitosamente',
      nombre,
      email,
      passwordDecrypt
    })

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

    body.password = encript(body.password);

    await idUserExist.update(body)
    return res.json(idUserExist)

  } catch (error) {
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

export const deleteAllUsers = async (req:Request, res:Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(404).json(errors)
  }
  
  const deleteAll = await Usuario.findAll({
    where: {
      estado: true
    }
  })
  deleteAll.forEach(async (user)=>{
    await user.update({estado: false})
  })
  
  return res.json(deleteAll)
}

