import * as restify from 'restify'

export abstract class Router {
    abstract applyRoutes(application: restify.Server): any

    renderResult(response: restify.Response, next: restify.Next) {
        return (document: any) => {
            if (document) {
                response.json(document)
            } else {
                response.send(404)
            }
            return next()
        }
    }
}