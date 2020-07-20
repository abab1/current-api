import express from 'express';
import userController from '../../controllers/user';

const router = express.Router();

router.get('/:userId', userController.getByUserId);

router.get('/:userId/balance', userController.getUserBalance);

router.get('/:userId/transactions', userController.getTransactions);

router.get('/:userId/:merchantId/transactions', userController.getAllUserTransactionsByMerchant);

router.get('/:userId/transactions-summary', userController.getUserTransactionSummary);

router.post('/', userController.createIfDoesntExist);

router.patch('/:userId', userController.update);

router.post('/authorize-transaction', userController.authorizeTransaction);

export default router;
