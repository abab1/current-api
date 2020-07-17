import fetch from 'node-fetch';
import models from '../models';

const { Merchant, Transaction } = models;

const updateAddress = async (req, res, next) => {
  try {
    const { merchantId } = req.params;
    const merchant = await Merchant.findOne({ merchantId }).exec();
    if (!merchant) {
      return res.status(400).send('Merchant doesnt exist');
    }
    const { name, latitude, longitude } = merchant;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?
    location=${latitude},${longitude}&radius=1000&keyword=${
      name.split(' ')[0]
    }&key=AIzaSyBMqSF2_WoK8ow89v8Qq4SHLb94mY9B5j8`;
    const data = await fetch(url);
    const address = data && data.results && data.results[0] && data.results[0].vicinity;
    merchant.address = address;

    const updatedMerchant = await merchant.save();
    return res.status(201).send(`updated address: ${address}`);
  } catch (e) {
    return next(e);
  }
};

const getAllTransactionsForMerchant = async (req, res, next) => {
  try {
    const { merchantId } = req.params;
    const transactions = await Transaction.find({ merchantId }).exec();
    return res.status(200).send(transactions);
  } catch (e) {
    return next(e);
  }
};

export default {
  getAllTransactionsForMerchant,
  updateAddress,
};
