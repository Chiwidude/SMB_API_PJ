/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import {getBuilds, addBuild, getBuild, deleteBuild, updateBuild} from '../entities/builds';
import { getRandomInt } from '@shared/functions';
import { paramMissingError, CustomRequest, notFoundItem} from '@shared/constants';
import {Build} from "../types/types";

const router = Router();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT } = StatusCodes;

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/", async (req: Request, res: Response) => {
    const builds = await getBuilds();    
    return res.status(OK).json({builds});
})

router.get("/:id", async (req:Request, res: Response) => {
    const id : number = +req.params.id;
    const build = await getBuild(id);
    if(!build){
        return res.status(NOT_FOUND).json({
            error: notFoundItem,
        })
    }
    return res.status(OK).json({build});
})
router.post("/create", async (req: CustomRequest<Build>, res: Response) => {
    const build = req.body;    
    build.id = getRandomInt();    
    if(!build){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await addBuild(build);
    return res.status(CREATED).end();
})

router.delete("/delete/:id", async(req:Request, res: Response) => {
    const id:number = +req.params.id;
    const deleted = await deleteBuild(id);
    if(!deleted){
        return res.status(NOT_FOUND).end();
    }
    return res.status(NO_CONTENT).end();
})

router.put("/:id", async (req:CustomRequest<Build>, res:Response)=> {
    const updatedBuild = req.body;
    const id:number = +req.params.id;
    const updated = await updateBuild(id, updatedBuild);
    if(!updated){
        return res.status(NOT_FOUND).end();
    }else{
        res.status(NO_CONTENT).end();
    }
})

export default router;
