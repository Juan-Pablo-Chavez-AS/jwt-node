import dbClient from '../config/db.config';
import { clientInput, LoginCredentials, UserIdentity } from '../types/types';
import JWTManager from '../auth/jwt/jwt.auth';
import { JsonWebTokenError } from 'jsonwebtoken';

export default class ClientRepository {
  private static readonly clientBasicInfoSelect = {
    id: true,
    username: true,
    token: true
  };

  constructor() {}

  public async createClient(clientData: clientInput) {
    clientData = { ...clientData, password_hash: 'whatever' }; // WIP: hashing

    const newClient = await dbClient.client.create({
      data: clientData,
      select: ClientRepository.clientBasicInfoSelect
    });

    const token = JWTManager.generateToken(newClient);

    const clientWithToken = await dbClient.client.update({ where: { id: newClient.id }, data: { token: token }, select: ClientRepository.clientBasicInfoSelect });

    return clientWithToken;
  }

  public async getInfoClient(clientId: number, identity: UserIdentity) {
    if (clientId !== identity.id) {
      throw new JsonWebTokenError('Missmatching ids');
    }


    const clientInfo = dbClient.client.findUnique({ where: { id: identity.id }, select: ClientRepository.clientBasicInfoSelect });
    return clientInfo;
  }

  public async login(credentials: LoginCredentials) {
    const client = await dbClient.client.findUnique({
      where: {
        username: credentials.username,
        password: credentials.password
      },
      select: ClientRepository.clientBasicInfoSelect
    });

    return client;
  }

}
