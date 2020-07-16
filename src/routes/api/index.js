import express from 'express';
import user from './user';
import merchants from './merchants';

let router = express.Router();

router.use('/user', user);
router.use('/merchant', merchants);

export default router;
