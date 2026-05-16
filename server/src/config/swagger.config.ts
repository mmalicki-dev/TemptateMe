import type { OAS3Options } from 'swagger-jsdoc';

const swaggerConfig: OAS3Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'TemptateMe API',
      version: '1.0.0',
      description: 'REST API documentation for TemptateMe.',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
    },
    basePath: '/api',
    servers: [
      {
        url: 'http://localhost:3001/api/',
      },
    ],
  },
  tags: [
    { name: 'Auth', description: 'API for authorization' },
    { name: 'User', description: 'API for users' },
    { name: 'Recipes', description: 'API for recipes' },
    { name: 'Ingredients', description: 'API for ingredients' },
    { name: 'Categories', description: 'API for categories' },
  ],
  apis: [
    'src/models/*.ts',
    'src/utils/helpers/*.ts',
    'src/api/controllers/auth/*.ts',
    'src/api/controllers/user/*.ts',
    'src/api/controllers/recipes/*.ts',
  ],
};

export default swaggerConfig;
