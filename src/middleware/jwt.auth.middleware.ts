import { Request, Response, NextFunction } from "express";
import { AuthMiddleware } from "../types/types";
import JWTManager from "../auth/jwt/jwt.auth";
import { JsonWebTokenError } from "jsonwebtoken";

export default class JWTMiddleware implements AuthMiddleware {

  constructor() {

  }

  validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.jwt
    if (token === undefined) {
      return res.status(401).json({ message: 'Token not found, access denied' })
    }

    try {
      req.body.identity = JWTManager.validateToken(token)
      next()
    } catch (err: any) {
      if (err instanceof JsonWebTokenError) {
        return res.status(401).json({ message: err.message, stack: err.stack })
      } else {
        return res.status(500).json({ message: err.message, stack: err.stack })
      }
    }

  }

}
