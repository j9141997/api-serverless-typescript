import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'my-api',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    functionsBasePath: 'src/handlers'
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
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
    health: {
      handler: 'options.healthCheck',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello'
          }
        }
      ]
    }
    // hello: {
    //   handler: 'handler.hello',
    //   events: [
    //     {
    //       http: {
    //         method: 'get',
    //         path: 'hello',
    //       }
    //     }
    //   ]
    // }
  }
}

module.exports = serverlessConfiguration;
