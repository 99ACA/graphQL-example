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
  -  [Data-Source - ](https://www.apollographql.com/docs/apollo-server/data/data-sources/)
     -  `yarn add apollo-datasource-rest`

  - IDE VS-Code `ext install apollographql.vscode-apollo`

### NVM

  - Integration while doing cd [info](https://github.com/nvm-sh/nvm#deeper-shell-integration)

### Testing

 - Install
   - `yarn add -D jest @types/jest ts-jest`
   - Report `yarn add -D jest-junit`

## Tasks List

 - [ ] other option to [load schema](https://www.graphql-tools.com/docs/generate-schema)
 - [X] .env (in develop & testing)
 - [ ] Logger
   - Check loggers [link](https://www.loggly.com/ultimate-guide/node-logging-basics/)
 - [ ] Testing
 - [ ] Mocks
   - [Mocks](https://www.graphql-tools.com/docs/mocking)
 - [ ] N + 1 Probelm
 - [ ] Cache
 - [ ] Authorizations & Permissions
 - [ ] Middleware
   - [Cors](https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express)

### To Check 

- [Open-API Gen](https://openapi-generator.tech/docs/generators/javascript-apollo/)