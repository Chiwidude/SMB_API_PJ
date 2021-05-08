/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {authToken} from './_helpers/jwt';

const router = Router();
import {getBuilds, getBuildWId, createBuild, deleteBuild, updateBuild} from './controllers/builds.controller';

router.get("/", getBuilds);

router.get("/:id", getBuildWId);

router.post("/create", authToken, createBuild)

router.delete("/delete/:id", authToken, deleteBuild);

router.put("/:id", authToken,updateBuild);


export default router;
