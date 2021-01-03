import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import Option from '../models/option';
class OptionsController extends Option {
  async index(): Promise<APIGatewayProxyResult> {
    return await this.find();
  }

  async show(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const uuid = event.pathParameters.uuid;
    return await this.findOne(uuid);
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

    return await this.createOption({
      Item: {
        uuid: uuidv4(),
        title: data.title,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    });
  }
}

export default OptionsController;
