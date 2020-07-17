import express from 'express';
import merchantController from '../../controllers/merchants';

let router = express.Router();

router.get('/:merchantId/transactions', merchantController.getAllTransactionsForMerchant);

router.patch('/:merchantId', merchantController.updateAddress);

export default router;
