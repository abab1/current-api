import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';
import models, { connectDb } from './models';

//Express setup
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

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

connectDb();

app.listen(3000, function () {
  console.log(`app listening on port 3000! ${process.env.MY_SECRET}`);
});
