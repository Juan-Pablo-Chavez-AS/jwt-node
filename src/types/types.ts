import { Router } from "express";

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
