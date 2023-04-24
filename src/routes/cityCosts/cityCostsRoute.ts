import { Router } from 'express';
import * as CostController from '../../controller/costsController';
import { validateRequest } from '../../middlewares';
import { CityCostsRequestSchema, CityValidationSchema } from '../../interface/Validations';

const router = Router();

router.get('/', CostController.getCities);

router.post('/city', validateRequest({ body: CityValidationSchema }), CostController.getCity);

router.post('/calculate', validateRequest({ body: CityCostsRequestSchema }), CostController.getPrice);

export default router;