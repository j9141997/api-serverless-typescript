import { APIGatewayProxyHandler, Handler } from 'aws-lambda';
import 'source-map-support/register';
import OptionsController from './src/controllers/optionsController';

const optionsController = new OptionsController();

/* eslint-disable @typescript-eslint/no-unused-vars */
export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2,
    ),
  };
};

export const getOptions: APIGatewayProxyHandler = async (_event, _context) => {
  console.log(_context);
  return optionsController.index();
};

export const getOption: APIGatewayProxyHandler = async (event, _context) => {
  return optionsController.show(event);
};

export const createOption: APIGatewayProxyHandler = async (event, _context) => {
  return optionsController.create(event);
};
