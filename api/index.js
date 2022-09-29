
const server = require('./src/app.js');
const { db } = require('./src/db.js');

// Syncing all the models at once.
db.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
  });
});
