import type { AWS } from '@serverless/typescript';

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
        seed: false,
        sharedDB: true,
      },
    },
  },
  resources: {
    Resources: {
      JankensTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'jankens',
          AttributeDefinitions: [
            {
              AttributeName: 'player',
              AttributeType: 'S',
            },
            {
              AttributeName: 'unixtime',
              AttributeType: 'N',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'player',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'unixtime',
              KeyType: 'RANGE',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
      OptionsTables: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'options',
          AttributeDefinitions: [
            {
              AttributeName: 'uuid',
              AttributeType: 'S',
            },
            {
              AttributeName: 'title',
              AttributeType: 'S',
            },
            // テーブル作成時は不要
            // {
            //   AttributeName: 'createdAt',
            //   AttributeType: 'S',
            // },
            // {
            //   AttributeName: 'updatedAt',
            //   AttributeType: 'S',
            // },
          ],
          KeySchema: [
            {
              AttributeName: 'uuid',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'title',
              KeyType: 'RANGE',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
  // Add the serverless-webpack plugin
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
  },
};

module.exports = serverlessConfiguration;
