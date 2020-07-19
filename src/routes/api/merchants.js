import express from 'express';
import merchantController from '../../controllers/merchants';

let router = express.Router();

router.get('/:merchantId/transactions', merchantController.getAllTransactionsForMerchant);

router.patch('/:merchantId/updateAddress', merchantController.updateAddress);

export default router;
