import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Northwind API',
        version: '1.0.0',
        description: 'Project made in NodeJS in order to provide a Rest API to the northwind Database, the database is given in SQL and Prisma is used as ORM.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'Vicente Matallana',
            url: 'https://twitter.com/Cluuuny',
        },
    },
    servers: [
        {
            url: 'https://northwind-api-brat.onrender.com',
            description: 'Development server',
        },
    ],
}

const spec = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
}

export const swaggerSpec = swaggerJSDoc(spec)