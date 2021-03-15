import { Router } from 'express';
import BuildRouter from './Builds';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/builds', BuildRouter);

// Export the base-router
export default router;
