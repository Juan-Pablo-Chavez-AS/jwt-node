import { NextFunction, Request, Response, Router } from "express";

export interface clientInput {
  username: string,
  password: string,
  password_hash?: string,
  token?: string,
}

export interface ModelRouter {
  readonly PATH: string,
  getRouterPath: () => RouterPath
}

export interface RouterPath {
  router: Router,
  path: string,
}

export interface LoginCredentials {
  username: string,
  password: string
}

export interface AuthMiddleware {
  validateToken: (req: Request, res: Response, next: NextFunction) => void
}
