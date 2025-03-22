const swaggerAutogen = require('swagger-autogen')();


const port = process.env.BACKEND_DOCKER_PORT ?? 3000;

const doc = {
    info: {
        version: '1.0',
        title: 'TFT API',
        description: 'API for table tournament manager'
    },
    host: `localhost:${port}`,
    basePath: '/',

    securityDefinitions: {},
    definitions: {}
};
const outputFile = './swagger-output.json';

const routes = [
    './src/index.ts',
];
swaggerAutogen(outputFile, routes, doc);