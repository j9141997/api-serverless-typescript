export default {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: 'options',
    AttributeDefinitions: [
      {
        AttributeName: 'uuid',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'uuid',
        KeyType: 'HASH',
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  },
};
