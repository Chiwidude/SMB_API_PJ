/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import {Build} from '../types/build';
import { Request, Response, Router } from 'express';
import { getRandomInt } from '@shared/functions';
import { paramMissingError, notFoundItem} from '@shared/constants';


const router = Router();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT } = StatusCodes;

router.get("/", async (req: Request, res: Response) => {
    const builds = await Build.find({});    
    return res.status(OK).json({builds});
})

router.get("/:id", async (req:Request, res: Response) => {
    const id  = req.params.id;
    const build = await Build.findById(id).exec();
    if(!build){
        return res.status(NOT_FOUND).json({
            error: notFoundItem,
        })
    }
    return res.status(OK).json({build});
})
router.post("/create", async (req: Request, res: Response) => {
    const build = req.body;    
    build.id = getRandomInt();    
    if(!build){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const nwbuild = new Build(build);
    await nwbuild.save();
    return res.status(CREATED).end();
})

router.delete("/delete/:id", async(req:Request, res: Response) => {
    const id = req.params.id;
    const deleted = await Build.findByIdAndDelete(id).exec();
    if(!deleted){
        return res.status(NOT_FOUND).end();
    }
    return res.status(NO_CONTENT).end();
})

router.put("/:id", async (req:Request, res:Response)=> {
    const updatedBuild = req.body;
    const id = req.params.id;
    const updated = await Build.findByIdAndUpdate(id, updatedBuild);
    if(!updated){
        return res.status(NOT_FOUND).end();
    }else{
        res.status(NO_CONTENT).end();
    }
})

export default router;
