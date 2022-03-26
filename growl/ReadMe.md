# Example GraphQL

Example of graphql using apollo

## Install 

- Specific GraphQL Tools:
  - [apollo express server](https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express)
    - ` yarn add apollo-server-express apollo-server-core express graphql `
  - [Graphql Tools](https://www.graphql-tools.com/docs/introduction), use to:
    - SDL (Schema Definition Language)
      - ` yarn add @graphql-tools/merge `
- Regular develop tool for TS
  - Global
    - `yarn global add nodemon`
  - [Dev](https://www.npmjs.com/package/ts-node)
    - `yarn add -D ts-node typescript tslib @types/node`

## Apollo Information


  -  [health checks - ](https://www.apollographql.com/docs/apollo-server/monitoring/health-checks/#http-level-health-checks)  `http://localhost:14011/.well-known/apollo/server-health`


## Tasks List
 - [X] .env (in develop & testing)
 - [ ] Logger
 - [ ] Authorizations & Permissions
 - [ ] N + 1 Probelm
 - [ ] Cache
 - [ ] Testing
 - [ ] Mocks