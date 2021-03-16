import { Router } from 'express';
import BuildRouter from './Builds';
import GuidesRouter from './Guides';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/builds', BuildRouter);
router.use('/guides', GuidesRouter);
// Export the base-router
export default router;
