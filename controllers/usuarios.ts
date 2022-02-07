import { Response, Request } from "express";

export const getUsuarios = (req:Request, res:Response) => {

  res.json({
    msg: 'Get Usuarios'
  })

}

export const getUsuario = (req:Request, res:Response) => {

  const { id } = req.params;

  res.json({
    msg: 'Get Usuario',
    id
  })

}

export const postUsuario = (req:Request, res:Response) => {
  const { body } = req;
  console.log(req.body);
  res.json({
    msg: 'post Usuario',
    body
  })

}

export const updatedUsuario = (req:Request, res:Response) => {
  const { id } = req.params;
  const { body } = req;

  res.json({
    msg: 'put Usuario',
    body
  })

}

export const deleteUsuario = (req:Request, res:Response) => {
  const { id } = req.params;

  res.json({
    msg: 'delete Usuario',
    id
  })

}




