import { Router } from 'express';
import BuildRouter from './Builds';
import GuidesRouter from './Guides';
import LoginRouter from './login';
import {authToken} from './_helpers/jwt';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/builds', authToken, BuildRouter);
router.use('/guides', authToken, GuidesRouter);
router.use('/users', LoginRouter);
// Export the base-router
export default router;
