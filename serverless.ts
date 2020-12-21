import type { AWS } from '@serverless/typescript';
import options from './dynamodb/migrations/options';

const serverlessConfiguration: AWS = {
  service: 'my-api',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    'serverless-offline': {
      httpPort: 8080,
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
        seed: true,
        sharedDB: true,
      },
      seed: {
        dev: {
          sources: [
            {
              table: 'options',
              sources: ['./dynamodb/seeds/options.json'],
            },
          ],
        },
      },
    },
  },
  resources: {
    Resources: {
      optionsTables: options,
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    hello: {
      handler: 'handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          },
        },
      ],
    },
    getOptions: {
      handler: 'handler.getOptions',
      events: [
        {
          http: {
            method: 'get',
            path: 'options',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
