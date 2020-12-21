import Option from '../models/option';

class OptionsController extends Option {
  async index(): Promise<any> {
    const response = await this.find({
      TableName: 'options',
    });
    return response;
  }
}

export default OptionsController;
