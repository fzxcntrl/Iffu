import express from 'express';
import { validateCoupon, createCoupon } from '../controllers/couponController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:code', validateCoupon);
router.post('/', protect, admin, createCoupon);

export default router;
