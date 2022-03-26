const packageInfo = require('../../package.json');

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
        console.error(`Error while reading dynamic parameters from the environment ${prefix}`,err);
        process.exit(1);
    }

    let restrictSchemaValues = getRestrictSchemaValues();

    return {
        ...defaultSchemaValue,
        ...restrictSchemaValues
    }
}

function getDefaultSchemaValues() {
    /**
     * Entire parameters that have also default value, in case there not exist
     */
    const schema = Joi.object({
        NODE_ENV: Joi.string().valid('development', 'staging', 'production', 'test').default('development'),
        HOST: Joi.string().default('0.0.0.0'),
        PORT: Joi.number().default(3000),
    })
    let values = validateAndGetValues(schema)

    return {
        port: values.PORT as number,
        NODE_ENV: values.NODE_ENV as string,
        // Additinal fields from package.json
        name : packageInfo.name as string,
        version : packageInfo.version as string,
    }
}
function getRestrictSchemaValues() {
    /**
     * Entire parameters that should be define
     */
    const schema = Joi.object({

    })

    let values = validateAndGetValues(schema)
    return {

    }
}
function validateAndGetValues(schema:ObjectSchema, allowUnknown: boolean = true) {
    let validate = schema.validate(process.env,{allowUnknown})
    if (validate.error) {
        console.error(`Config validation error: ${validate.error.message}`);
        process.exit(1);
    }
    return validate.value
}

function loadDotEnvConfigFile(prefix: string ='') {
    /**
     * Load the configuration file only in development/test
     **/
    if (process.env.NODE_ENV === undefined || process.env.NODE_ENV in ['development','test']){
        let fileName = prefix === '' ? '.env' : `.${prefix.toLowerCase()}.env`
        console.info(`Going to try load the configuration from file name - ${fileName}`)
        let configPath = path.join(__dirname, './..', fileName)
        if (!fs.existsSync(configPath)) { // running with nodemon
            configPath = path.join(__dirname, './../..', fileName)
        }
        let env = config({ path: configPath });
        if (env.error) {
            console.error(`Error while read the configuration file. ${env.error}`)
            throw env.error
        }
    }
}

const ServiceConfig = getServiceConfig()

export {
    ServiceConfig
}