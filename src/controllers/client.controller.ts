import { Request, Response } from 'express';
import ClientRepository from '../repositories/client.repository';
import { LoginCredentials, UserIdentity, clientInput } from '../types/types';
import { JsonWebTokenError } from 'jsonwebtoken';
import ErrorResponse from '../responses/error.response';
import JWTManager from '../auth/jwt/jwt.auth';

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
      const clientDataWithHash = { ...clientData, password_hash: 'whatever' };

      const newClient = await this.repository.createClient(clientDataWithHash);

      return res.status(201).json(newClient);
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
      const client = await this.repository.login(credentials);

      if (client === null) {
        return res.status(400).json({
          message: 'Invalid credentials'
        });
      }

      const token = JWTManager.generateToken(client);
      const loggedClient = await this.repository.assingTokenToClient(client.id, token);

      return res.status(200).cookie('jwt', token).json(loggedClient);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(500).json(ErrorResponse.simpleErrorResponse(err));
      }
    }
  }
}
