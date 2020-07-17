import express from 'express';
import userController from '../../controllers/user';

let router = express.Router();

router.get('/:id', userController.getByUserId);

router.get('/:userId/balance', userController.getBalance);

router.get('/:userId/transactions', userController.getTransactions);

router.get('/:userId/:merchantId/transactions', userController.getAllUserTransactionsByMerchant);

router.get('/:userId/transactions-summary', userController.getUserTransactionSummary);

router.post('/', userController.create);

router.patch('/:id', userController.update);

router.post('/authorize-transaction', userController.authorizeTransaction);

export default router;
