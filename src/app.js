import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import { connectDb } from './models';

//Express setup
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

connectDb();

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

/// error handler
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(err.status || 500);
  return res.json({
    errors: {
      message: err.message,
      error: err,
    },
  });
});

export default app;
