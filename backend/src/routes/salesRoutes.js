import express from 'express';
import { fetchSales, fetchFilterOptions } from '../controllers/salesController.js';

const router = express.Router();

router.get('/sales', fetchSales);
router.get('/filter-options', fetchFilterOptions);

export default router;
