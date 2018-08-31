import restify from 'restify'
import mongoose from 'mongoose'

import {environment} from '../common/environment'
import {Router} from '../common/router'
import {mergePatchBodyParse} from './merge-patch.parse'

class Server {

    application: restify.Server

    constructor(){
        this.application = restify.createServer({
            name: 'contact-api',
            version: '1.0.0',
        })
    }

    initializeDB() {
        return mongoose.connect(environment.db.url, {
            useNewUrlParser: true
        })
    }

    initRoutes(routers: Array<Router>): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            try {
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParse)

                // ROUTES
                for (let router of routers) {
                    router.applyRoutes(this.application)
                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

            } catch (error) {
                reject(error)
            }
        })
    }

    bootstrap(routers: Array<Router>): Promise<Server> {
        return this.initializeDB().then(() => 
            this.initRoutes(routers).then(() => this)
        )
    }
}

export default Server