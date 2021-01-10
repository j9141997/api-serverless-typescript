import dynamodb from '../dynamodb';
import { ResponseUtil, Response } from '../utils/response';

type Input = {
  Item: {
    uuid: string;
    title: string;
    options: {
      name: string;
      merits: string[];
      demerits: string[];
    };
    createdAt: number;
    updatedAt: number;
  };
};

class Option {
  private readonly defaultParams = {
    TableName: 'options',
  };

  protected async find(): Promise<Response | null> {
    try {
      const result = await dynamodb.scan(this.defaultParams).promise();
      const data = {
        options: result.Items,
      };
      return ResponseUtil.success(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  protected async findOne(uuid: string): Promise<Response | null> {
    try {
      const params = {
        ...this.defaultParams,
        Key: {
          uuid: uuid,
        },
      };
      const result = await dynamodb.get(params).promise();
      const data = {
        option: result.Item,
      };
      return ResponseUtil.success(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  protected async createOption(data: Input): Promise<Response | null> {
    const params = {
      ...this.defaultParams,
      ...data,
    };
    try {
      const result = await dynamodb.put(params).promise();
      console.log(result);
      const data = {
        message: 'Successfully created item',
      };
      return ResponseUtil.success(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected async updateOption(uuid: string, data: any): Promise<Response | null> {
    const params = {
      ...this.defaultParams,
      Key: {
        uuid: uuid,
      },
      ExpressionAttributeNames: {
        '#t': 'title',
        '#u': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':newTitle': data.title,
        ':newUpdatedAt': data.updatedAt,
      },
      UpdateExpression: 'SET #t = :newTitle, #u = :newUpdatedAt',
    };
    try {
      const result = await dynamodb.update(params).promise();
      console.log(result);
      const data = {
        message: 'Successfully created item',
      };
      return ResponseUtil.success(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  protected async removeOption(uuid: string): Promise<Response | null> {
    const params = {
      ...this.defaultParams,
      Key: {
        uuid: uuid,
      },
    };

    console.log(params);
    try {
      const result = await dynamodb.delete(params).promise();
      console.log(result);
      const data = {
        message: 'Successfully deleted item',
      };
      return ResponseUtil.success(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default Option;
