import { Response, Request } from "express";
import Usuario from "../models/user";
import bcrypt from 'bcrypt';

export const autenticacion = (req:Request, resp:Response) => {
  resp.json({
    msg: 'ok'
  })
}
