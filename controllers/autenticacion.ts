import { Response, Request } from "express";
import Usuario from "../models/user";
import bcrypt from 'bcrypt';

export const autenticacion = (req:Request, resp:Response) => {
  const {body} = req
  return resp.json({
    msg: 'ok',
    body
  })
}
