import dynamodb from '../dynamodb';

class Option {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected async find(params): Promise<any> {
    try {
      const result = await dynamodb.scan(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      };
    } catch (error) {
      return console.error(error);
    }
  }
}

export default Option;
