const express = require('express');
const app = express();
const port = 3000;

const router = require('../router');
const { 
  errorHelper, 
  notFoundHandler,
  requestLogger,
  logger
} = require('../utils');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(requestLogger);

router(app);

app.use(notFoundHandler);
app.use(errorHelper);

app.listen(port, () => logger.info(`app listen on port ${port}`));