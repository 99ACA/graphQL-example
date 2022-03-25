import * as Joi from "joi"
import * as path from "path"
import { config } from "dotenv";
import fs from 'fs';
import type { ObjectSchema } from "joi";


function getServiceConfig() {

    let defaultSchemaValue = getDefaultSchemaValues();

    let prefix = process.env.ENVIRONMENT || defaultSchemaValue.NODE_ENV

    try {
        loadDotEnvConfigFile(prefix)
    } catch (err) {
        console.error(`Error while reading dynamic parameters from the environment ${prefix}`)
        throw err
    }

    let restrictSchemaValues = getRestrictSchemaValues();

    return {
        ...defaultSchemaValue,
        ...restrictSchemaValues
    }
}

function getDefaultSchemaValues() {
    const schema = Joi.object({
        NODE_ENV: Joi.string().valid('development', 'staging', 'production', 'test').default('development'),
        HOST: Joi.string().default('0.0.0.0'),
        PORT: Joi.number().default(3000),
    })
    let values = validateAndGetValues(schema)

    return {
        port: values.PORT as number,
        NODE_ENV: values.NODE_ENV as string
    }
}
function getRestrictSchemaValues() {
    const schema = Joi.object({

    })

    let values = validateAndGetValues(schema)
    return {

    }
}
function validateAndGetValues(schema:ObjectSchema) {
    let validate = schema.validate(process.env,{allowUnknown: true})
    if (validate.error) {
        throw new Error(`Config validation error: ${validate.error.message}`);
    }
    return validate.value
}

function loadDotEnvConfigFile(prefix: string) {
    console.info(`Going to try load the configuration from file name - .${prefix}.env`)
    let configPath = path.join(__dirname, './..', `.${prefix.toLowerCase()}.env`)
    if (!fs.existsSync(configPath)) { // running with nodemon
        configPath = path.join(__dirname, './../..', `.${prefix.toLowerCase()}.env`)
    }
    let env = config({ path: configPath });
    if (env.error) {
        console.error(`Error while read the configuration file. ${env.error}`)
        throw env.error
    }
}

const serviceConfig = getServiceConfig()

export {
    serviceConfig
}