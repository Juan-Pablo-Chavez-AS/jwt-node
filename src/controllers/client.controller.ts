import { Request, Response } from 'express';
import ClientRepository from '../repositories/client.repository';
import { LoginCredentials, UserIdentity, clientInput } from '../types/types';
import { JsonWebTokenError } from 'jsonwebtoken';
import ErrorResponse from '../responses/error.response';

export default class ClientController {
  private readonly repository: ClientRepository;

  constructor(repository: ClientRepository) {
    this.repository = repository;

    this.createClient = this.createClient.bind(this);
    this.getInfoClient = this.getInfoClient.bind(this);
    this.loginClient = this.loginClient.bind(this);
  }

  public async createClient(req: Request, res: Response) {
    try {
      const clientData = req.body as clientInput;
      const response = await this.repository.createClient(clientData);

      return res.cookie('jwt', response.token).status(201).json(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json(ErrorResponse.simpleErrorResponse(err));
      }
    }
  }

  public async getInfoClient(req: Request, res: Response) {
    try {
      const clientId = Number.parseInt(req.query.id as string);
      const identity = req.body.identity as UserIdentity;

      const response = await this.repository.getInfoClient(clientId, identity);
      return res.status(200).json(response);
    } catch (err: unknown) {
      if (err instanceof JsonWebTokenError) {
        return res.status(401).json(ErrorResponse.simpleErrorResponse(err));
      } else if (err instanceof Error) {
        return res.status(500).json(ErrorResponse.simpleErrorResponse(err));
      }
    }
  }

  public async loginClient(req: Request, res: Response) {
    try {
      const credentials = req.body as LoginCredentials;
      const response = await this.repository.login(credentials);

      return res.status(200).cookie('jwt', response.token).json(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(500).json(ErrorResponse.simpleErrorResponse(err));
      }
    }
  }
}
