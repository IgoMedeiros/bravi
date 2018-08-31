import Server from './server/server'
import { usersRouter } from './users/users.router'

const server = new Server()
const routers = [usersRouter]
server.bootstrap(routers).then(server => {
    console.log('Server listening on:', server.application.address());
}).catch(error => {
    console.log('Server failed on start.');
    console.log(error);
    process.exit(1)
})