import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import Option from '../models/option';
class OptionsController extends Option {
  async index(): Promise<APIGatewayProxyResult> {
    const response = await this.find({
      TableName: 'options',
    });
    return response;
  }

  async show(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const response = await this.findOne({
      TableName: 'options',
      Key: {
        uuid: event.pathParameters.uuid,
      },
    });
    return response;
  }

  async create(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (!data.title) {
      console.error('validation failed');
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't create the item.",
      };
    }

    const response = await this.createOption({
      TableName: 'options',
      Item: {
        uuid: uuidv4(),
        title: data.title,
        createAt: timestamp,
        updatedAt: timestamp,
      },
    });
    return response;
  }
}

export default OptionsController;
