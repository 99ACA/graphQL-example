import path from 'path'
import express from 'express'
import http from 'http'

import * as bodyParser from "body-parser"
import compression from "compression"
import helmet from "helmet"

import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'

import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import { ServiceConfig } from './common/config'
import type { GraphQLSchema } from 'graphql/type'

export class Server {
    // expose for testing
    private app: express.Express

    private port: any = 3000
    private httpServer: http.Server
    private graphqlPath: string

    constructor() {
        this.app = express()
        this.app.disable('x-powered-by')
        let isDevelopment = process.env.NODE_ENV === 'development'

        // this.app.use(helmet({
        //                 crossOriginEmbedderPolicy: !isDevelopment,
        //                 contentSecurityPolicy: !isDevelopment
        // })); // Security
        this.app.use(compression())
        this.app.use(bodyParser.json()) // support json encoded bodies
        this.app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
        


        this.httpServer = http.createServer(this.app)
        this.port = ServiceConfig.port;
        this.graphqlPath =  `/${ServiceConfig.name}/`
    }

    public async listen() {
        // Get Apollo server
        const apolloServer = this.getApolloServer()
        // -> 
        // Additional middleware can be mounted at this point to run before Apollo.
        // app.use('*', jwtCheck, requireAuth, checkScope);

        // More required logic for integrating with Express
        await apolloServer.start();
        // Middlewares
        apolloServer.applyMiddleware({
            app: this.app,

            // By default, apollo-server hosts its GraphQL endpoint at the
            // server root. However, *other* Apollo Server packages host it at
            // /graphql. Optionally provide this to match apollo-server.
            path: this.graphqlPath
        });
        // 
        this.httpServer.listen(this.port)
        this.httpServer.on('error', this.onError)
        this.httpServer.on('listening', this.onServerListen)
    }

    public stop = async () => {
        if (this.httpServer) {
            this.httpServer.close()
            console.info(`The server stops accepting new connections`)
        }
    }

    private getApolloExecutableSchema():GraphQLSchema{
        // More information https://www.graphql-tools.com/docs/schema-merging

        // Load schema types
        let loadedTypeFiles = loadFilesSync(path.join(__dirname, 'graphql/**/*.graphql'))
        let mergeType = mergeTypeDefs(loadedTypeFiles)
        // Load schema resolver
        let loadedresolversFiles = loadFilesSync(path.join(__dirname, './graphql/resolvers/**/*.*')) // include js/ts
        let mergeResolver = mergeResolvers(loadedresolversFiles)

        return makeExecutableSchema({
            typeDefs: mergeType, // representations of GraphQL schema in the Schema Definition Language (SDL) 
            resolvers: mergeResolver,
            // schemaDirectives,
        })
    }
    private getApolloServer = (): ApolloServer => {

        let schema:GraphQLSchema = this.getApolloExecutableSchema();
        
        // More information about the options - https://master--apollo-server-docs.netlify.app/docs/apollo-server/api/apollo-server/
        return new ApolloServer({            
            schema,
            // context:   //An object or function called with the current request that creates the context shared across all resolvers

            // logger:    // 
            // formatError:   // Functions to format the errors and response returned from the server 
            // subscriptions: 
            // persistedQueries: 
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
                /* This plugin is defined in-line. */
                {
                    async serverWillStart() {
                        console.log('GraphQL server starting up.');
                    },
                }
            ],
        })
    }

    private onError = (err: any) => {
        switch (err.code) {
            case 'EACCES':
                console.error('port requires elevated privileges');
                process.exit(1);
            case 'EADDRINUSE':
                console.error(`port ${this.port}, is already in use`);
                process.exit(1);
            default:
                throw err;
        }
    }
    private onServerListen = () => {
        console.info(`Server is ready at http://localhost:${this.port}${this.graphqlPath}graphql`);
    }

}

