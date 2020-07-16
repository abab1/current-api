import express from 'express';
import user from './user';
let router = express.Router();

router.use('/user', user);

export default router;
