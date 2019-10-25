const express = require('express');
const app = express();
const path = require('path');
const compression = require("compression");

app.use(compression());

app.use(express.static(path.join(__dirname, '../app/build')));

app.listen(4000);
console.log('Listening on port 4000');