import Option from '../models/option';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
class OptionsController extends Option {
  async index(): Promise<APIGatewayProxyResult> {
    const response = await this.find({
      TableName: 'options',
    });
    return response;
  }

  async show(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log(event.pathParameters.uuid);
    const response = await this.findOne({
      TableName: 'options',
      Key: {
        uuid: event.pathParameters.uuid,
      },
    });
    return response;
  }
}

export default OptionsController;
