/**
 * VirtualSports server.
 */
const express = require('express');
const app = express();
const path = require('path');
function run() {
  console.debug(path.join(__dirname,'/dist'));
  app.use(express.static(path.join(__dirname,'/dist')));
  app.listen(3000, () => {
    console.log(`Example app listening on port http://localhost:${3000}!`);
  });
}

run();
