import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const healthCheck: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Health Check of Option Handlers is OK!',
      input: event,
    }, null, 2),
  };
}
