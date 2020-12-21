import dynamodb from '../dynamodb';

class Option {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected async find(params): Promise<any> {
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
}

export default Option;
