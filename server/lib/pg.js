require('dotenv').config();
const pg = require("pg");

pg.defaults.ssl = true;
console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  // client
  //   .query('SELECT table_schema,table_name FROM information_schema.tables;')
  //   .on('row', function(row) {
  //     console.log(JSON.stringify(row));
  //   });

  client
    .query('SELECT asd FROM tusers;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});
