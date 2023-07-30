import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { TrackAPI } from './datasources/track-api';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { cache } = server;
  const { url } = await startStandaloneServer(server, {
    context: async () => ({
      dataSources: { trackAPI: new TrackAPI({ cache }) },
    }),
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
