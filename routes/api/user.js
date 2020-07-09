import express from 'express';
let router = express.Router();

router.get('/:id', (req, res, next) => {
  res.json(`users is ${req.params.id}`);
});

export default router;
