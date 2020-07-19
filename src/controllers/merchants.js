import fetch from 'node-fetch';
import models from '../models';

const { Merchant, Transaction } = models;

const updateAddress = async (req, res, next) => {
  try {
    const { merchantId } = req.params;
    const merchant = await Merchant.findOne({ merchantId });
    if (!merchant) {
      return res.status(400).send({ reason: 'Merchant doesnt exist' });
    }
    const { name, latitude, longitude } = merchant;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?
    location=${latitude},${longitude}&radius=1000&keyword=${
      name.split(' ')[0]
    }&key=AIzaSyBMqSF2_WoK8ow89v8Qq4SHLb94mY9B5j8`;
    const data = await fetch(url);
    const address = data && data.results && data.results[0] && data.results[0].vicinity;

    if (address) {
      merchant.address = address;
      await merchant.save();
      return res.status(201).send(`updated address: ${address}`);
    }

    return res.status(400).send({ reason: 'Could not find address on google places' });
  } catch (e) {
    return next(e);
  }
};

const getAllTransactionsForMerchant = async (req, res, next) => {
  try {
    const { merchantId } = req.params;
    const transactions = await Transaction.find({ merchantId });
    return res.status(200).send(transactions);
  } catch (e) {
    return next(e);
  }
};

export default {
  getAllTransactionsForMerchant,
  updateAddress,
};
