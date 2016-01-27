import * as pg from "../pg.d"

pg.connect("postgres://...", (err, client, done) => {
  if (err) {
    return console.error('error fetching client from pool', err)
  }

  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    done()

    if (err) {
      return console.error('error running query', err)
    }

    console.log(result.rows[0].number)
  })
})