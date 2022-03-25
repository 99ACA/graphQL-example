import * as path from "path"
import { config } from "dotenv";
import fs from 'fs';

//Load and display config variables defined in .env file
let prefix = process.env.ENVIRONMENT || process.env.NODE_ENV || 'local'
process.env.ENVIRONMENT = process.env.NODE_ENV = prefix
console.info(`Going to try load the configuration from file name - .${prefix}.env`)
let configPath = path.join(__dirname, './..', `.${prefix.toLowerCase()}.env`)
if (!fs.existsSync(configPath)){ // running with nodemon
    configPath = path.join(__dirname, './../..', `.${prefix.toLowerCase()}.env`)
}
let env = config({ path: configPath });
if (env.error) {
    console.error(`Error while read the configuration file. ${env.error}`)
    throw env.error
}