require('dotenv').config();
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const express = require('express');
const createApolloGraphqlServer = require('./graphql/index.js');

const PORT = Number(process.env.PORT) || 4000;

const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the Server',
    });
  });

  app.use('/graphql', expressMiddleware(await createApolloGraphqlServer()));

  app.listen(PORT, () => console.log(`Server is started on PORT: ${PORT}`));
};

startServer();
