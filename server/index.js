const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

async function startServer() {
    const app = express();

    // Enable CORS for all routes
    app.use(cors());

    // Create Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            // Add authentication context here if needed
            const token = req.headers.authorization || '';
            return { token };
        },
        introspection: true, // Enable GraphQL Playground in production
        playground: true,
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`📊 GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer().catch(error => {
    console.error('Error starting server:', error);
});
