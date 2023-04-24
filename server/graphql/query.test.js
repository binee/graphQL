const { createTestClient } = require('apollo-server-testing');

const { QueryMock } = require('graphql-query-test-mock');
const typeDefs = require("./schemaGql");

test('read a list of books name', async () => {
    // create a new instance of our server (not listening on any port)
    const server = createServer();
  
    // apollo-server-testing provides a query function
    // in order to execute graphql queries on that server
    const { query } = createTestClient(server);
  
    // graphl query
    const GET_BOOKS = `
    {
      books {
        name
      }
    }
    `;
  
    // act
    const response = await query({ query: typeDefs.users });
  
    // assert
    expect(response.data.books).toEqual([{ name: 'The Colour Of Magic' }]);
  });

