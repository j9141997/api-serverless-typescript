export default {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: 'options',
    AttributeDefinitions: [
      {
        AttributeName: 'uuid',
        AttributeType: 'S',
      },
      {
        AttributeName: 'title',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'uuid',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'title',
        KeyType: 'RANGE',
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  },
};
