import { Request, Response, NextFunction } from "express";

import AppError from "../errors/AppError";
import Whatsapp from "../models/Whatsapp";

type HeaderParams = {
  Bearer: string;
};

const tokenAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("=== Token Auth Debug ===");
    console.log("Authorization header:", req.headers.authorization);
    
    if (!req.headers.authorization) {
      throw new Error("No authorization header");
    }
    
    const token = req.headers.authorization.replace('Bearer ', '');
    console.log("Token:", token.substring(0, 10) + "...");
    
    const whatsapp = await Whatsapp.findOne({ where: { token } });
    console.log("Whatsapp found:", whatsapp ? `ID: ${whatsapp.id}` : "NOT FOUND");
    
    if (whatsapp) {
      req.params = {
        whatsappId: whatsapp.id.toString()
      }
    } else {
      throw new Error("Token not found in database");
    }
  } catch (err) {
    console.error("Token auth error:", err);
    throw new AppError(
      "Acesso não permitido",
      401
    );
  }

  return next();
};

export default tokenAuth;
