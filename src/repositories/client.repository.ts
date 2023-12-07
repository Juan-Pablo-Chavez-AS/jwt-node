import dbClient from '../config/db.config';
import { clientInput, UserIdentity } from '../types/types';
import { JsonWebTokenError } from 'jsonwebtoken';

export default class ClientRepository {
  private static readonly clientBasicInfoSelect = {
    id: true,
    username: true,
    token: true
  };
  private static readonly clientPasswordHashSelect = {
    id: true,
    username: true,
    password_hash: true
  };

  constructor() {}

  public async createClient(clientData: clientInput) {
    const newClient = await dbClient.client.create({
      data: clientData,
      select: ClientRepository.clientBasicInfoSelect
    });

    return newClient;
  }

  public async assingTokenToClient(clientId: number, token: string) {
    return dbClient.client.update({ where: { id: clientId }, data: { token: token }, select: ClientRepository.clientBasicInfoSelect });
  }

  public async getInfoClient(clientId: number, identity: UserIdentity) {
    if (clientId !== identity.id) {
      throw new JsonWebTokenError('Missmatching ids');
    }


    const clientInfo = dbClient.client.findUnique({ where: { id: identity.id }, select: ClientRepository.clientBasicInfoSelect });
    return clientInfo;
  }

  public async getUserByUsername(username: string) {
    const client = await dbClient.client.findUnique({
      where: {
        username: username,
      },
      select: ClientRepository.clientPasswordHashSelect
    });

    return client;
  }

}
