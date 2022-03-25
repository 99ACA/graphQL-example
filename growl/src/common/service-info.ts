const packageInfo = require('../../package.json');
const SERVICE_NAME = packageInfo.name;
const SERVICE_VERSION = packageInfo.version;

export {
    SERVICE_NAME as ServiceName,
    SERVICE_VERSION as ServiceVersion,
};