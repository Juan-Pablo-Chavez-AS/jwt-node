import { Router } from "express";
import ClientController from "../controllers/client.controller";
import { AuthMiddleware, ModelRouter } from "../types/types";
import JWTMiddleware from "../middleware/jwt.auth.middleware";

export default class ClientRouter implements ModelRouter{
  private router: Router = Router()
  private controller: ClientController
  private authMiddleware: AuthMiddleware

  public readonly PATH = '/clients'

  public constructor(controller: ClientController) {
    this.authMiddleware = new JWTMiddleware()

    this.controller = controller
    this.router.get('/', this.authMiddleware.validateToken, this.controller.getInfoClient)
    this.router.post('/', this.controller.createClient)
    this.router.post('/auth', this.controller.loginClient)
    // this.router.delete('/:id', this.controller.deleteClient)
  }

  public getRouterPath() {
    return { router: this.router, path: this.PATH }
  }

}
