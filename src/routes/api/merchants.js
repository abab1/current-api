import express from 'express';
import merchantController from '../../controllers/merchants';

const router = express.Router();

router.get('/:merchantId', merchantController.getMerchant);

router.get('/:merchantId/transactions', merchantController.getAllTransactionsForMerchant);

router.patch('/:merchantId/update-address', merchantController.updateAddress);

export default router;
