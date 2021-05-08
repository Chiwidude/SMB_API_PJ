/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {  Router } from 'express';
import {getGuides, getGuideWId, createGuide, deleteGuide, updateGuide} from './controllers/guides.controller';
import {authToken} from './_helpers/jwt';

const router = Router();

router.get("/", getGuides);

router.get("/:id", getGuideWId);

router.post("/create", authToken, createGuide);

router.delete("/delete/:id", authToken,deleteGuide);

router.put("/:id", authToken,updateGuide);

export default router;