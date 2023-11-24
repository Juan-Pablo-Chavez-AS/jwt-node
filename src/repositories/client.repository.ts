import dbClient from '../config/db.config'
import { clientInput } from '../types/types';
import JWTManager from '../auth/jwt/jwt.auth';
import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';

export default class ClientRepository {
    private static readonly clientInfoSelect = {
        id: true,
        username: true,
        token: true
    }

    constructor() {

    }

    public async createClient(clientData: clientInput) {
        clientData = { ...clientData, password_hash: "whatever"} // WIP: hashing

        const newClient =  await dbClient.client.create({
            data: clientData,
            select: ClientRepository.clientInfoSelect
        });

        const token = JWTManager.generateToken(newClient)

        const clientWithToken = await dbClient.client.update({ where: {id: newClient.id}, data: {token: token}, select: ClientRepository.clientInfoSelect})

        return clientWithToken
    }

    public async getInfoClient(clientId: number, token: string ) {
        const payload = JWTManager.validateToken(token) as any

        if (clientId !== payload.id) throw new JsonWebTokenError("Missmatching ids")


        const clientInfo = dbClient.client.findUnique({ where: { id: payload.id }, select: ClientRepository.clientInfoSelect })
        return clientInfo
    }

    public async changeClientPassword() {

    }
}
