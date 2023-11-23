import { Request, Response } from "express";
import ClientRepository from "../repositories/client.repository";
import { clientInput } from "../types/types";

export default class ClientController {
  private readonly repository: ClientRepository

  constructor(repository: ClientRepository) {
    this.repository = repository

    this.createClient = this.createClient.bind(this)
  }

  public async createClient(req: Request, res: Response) {
    try {
      const clientData = req.body as clientInput
      const response = await this.repository.createClient(clientData)

      return res.status(201).json(response)
    } catch (err: any) {
      res.status(500).json({ message: err.message, stack: err.stack })
    }
  }
}
