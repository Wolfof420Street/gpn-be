import request from 'supertest';
import { ApolloServer } from 'apollo-server-express';
import { schema } from '../src/app/graphql/schema';
import { context } from '../src/app/graphql/context';
import express from 'express';

let app: express.Application;

beforeAll(async () => {
  const server = new ApolloServer({
    schema,
    context,
  });
  
  app = express();
  server.applyMiddleware({ app });
});

describe('GraphQL API', () => {
  it('should respond with 200 on the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should create a transaction', async () => {
    const mutation = `
      mutation {
        createTransaction(
          timestamp: "2023-08-10T12:34:56Z",
          type: "Transfer",
          txHash: "0x1234567890abcdef",
          gasUsed: 21000,
          gasPrice: 1000000000,
          gasLimit: 21000,
          gasFee: 21000,
          link: "http://example.com/tx/0x1234567890abcdef",
          from: "0xabc123"
        ) {
          id
          timestamp
          type
          txHash
        }
      }
    `;
    const response = await request(app)
      .post('/graphql')
      .send({ query: mutation });
    expect(response.status).toBe(200);
    expect(response.body.data.createTransaction).toHaveProperty('id');
    expect(response.body.data.createTransaction.type).toBe('Transfer');
  });

  it('should fetch transactions by address', async () => {
    const query = `
      query {
        transactions(address: "0xabc123") {
          id
          timestamp
          type
        }
      }
    `;
    const response = await request(app)
      .post('/graphql')
      .send({ query });
    expect(response.status).toBe(200);
    expect(response.body.data.transactions).toBeInstanceOf(Array);
  });
});
