const express = require('express');
const routerApi = require('./routes');
const { logErrors, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');
const db = require('./db');
const { DBCONNECTION } = require('./consts.json');
const cors = require('cors');

const app = express();
const port = 4000;
app.use(cors())

db(DBCONNECTION);

app.use(express.json());
routerApi(app); //Rutas de las entidades
//Menjo de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Este es el puerto ' + port);
})
