import express from 'express';
import models from '../../models';
import create from '../../utils/createDocument';
let router = express.Router();

const { Merchant, Transaction } = models;

router.get('/:merchantId/transactions', async (req, res, next) => {
  try {
    const { merchantId } = req.params;
    const transactions = await Transaction.find(merchantId).exec();
    return res.status(200).send(`Merchant transactions: ${JSON.stringify(transactions)}`);
  } catch (e) {
    return next(e);
  }
});

export default router;
