import dbClient from '../config/db.config'
import { clientInput } from '../types/types';
import JWTManager from '../auth/jwt/jwt.auth';

export default class ClientRepository {
    private static readonly clientInfoSelect = {
        id: true,
        username: true
    }

    constructor() {

    }

    public async createClient(clientData: clientInput) {
        const token = JWTManager.generateToken(clientData)

        clientData = { ...clientData, password_hash: "whatever", token: token }
        return await dbClient.client.create({
            data: clientData,
            select: ClientRepository.clientInfoSelect
        });
    }

    public async updateInfoClient() {

    }

    public async changeClientPassword() {

    }
}
