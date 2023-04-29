import { ApolloServer } from 'apollo-server-micro';

import Cors from 'cors';
import { schema } from './graphql/schema';

const cors = Cors({
  origin: '*', // You can set specific origins instead of using '*' (wildcard) for security purposes
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

const server = new ApolloServer({ schema });

const handler = server.createHandler({ path: '/api/graphql' });

export default (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return cors(req, res, () => handler(req, res));
};

export const config = {
  api: {
    bodyParser: false,
  },
};
