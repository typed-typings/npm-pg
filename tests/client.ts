import * as pg from '../index.d';

// instantiate a new client
// the client will read connection information from
// the same environment varaibles used by postgres cli tools
const client = new pg.Client();

// connect to our database
client.connect(function (err) {
  if (err) {
    throw err;
  }

  // execute a query on our database
  client.query('SELECT $1::text as name', ['brianc'], function (queryErr, result) {
    if (err) {
      throw err;
    }

    // just print the result to the console
    console.log(result.rows[0]); // outputs: { name: 'brianc' }

    // disconnect the client
    client.end();
  });
});
