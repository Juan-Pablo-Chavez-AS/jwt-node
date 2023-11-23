import { RouterPath } from './src/types/types'
import ClientController from './src/controllers/client.controller'
import ClientRepository from './src/repositories/client.repository'
import ClientRouter from './src/routes/client.route'
import Server from './src/server'

const clientRepository = new ClientRepository()
const clientController = new ClientController(clientRepository)
const clientRouter = new ClientRouter(clientController)

const routers: Array<RouterPath> = []
routers.push(clientRouter.getRouterPath())

const server = new Server(routers)

server.getApp().listen(3000, () => {
  console.log('pgsql server is listening on port 3000')
})
