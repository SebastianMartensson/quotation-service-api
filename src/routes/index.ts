import express from "express";
import cityCosts from './cityCosts/cityCostsRoute';

const router = express.Router();

router.use('/city-costs', cityCosts);

export default router;