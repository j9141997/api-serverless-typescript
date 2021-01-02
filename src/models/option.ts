import dynamodb from '../dynamodb';
import { Get, Put, GetItemOutput } from 'aws-sdk/clients/dynamodb';

type Output = {
  statusCode: number;
  body: string;
};

class Option {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected async find(params: Get): Promise<(GetItemOutput & Output) | any> {
    try {
      const result = await dynamodb.scan(params).promise();
      const data = {
        options: result.Items,
      };
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return console.error(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected async findOne(params: Get): Promise<(GetItemOutput & Output) | any> {
    try {
      const result = await dynamodb.get(params).promise();
      const data = {
        option: result.Item,
      };
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return console.error(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected async createOption(params: Put): Promise<any> {
    try {
      const result = await dynamodb.put(params).promise();
      console.log(result);
      const data = {
        message: 'Successfully created item',
      };
      return {
        statusCode: 201,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return console.error(error);
    }
  }
}

export default Option;
