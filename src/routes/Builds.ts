/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import {Build} from '../types/build';
import { Request, Response, Router } from 'express';
import { paramMissingError, notFoundItem} from '@shared/constants';
import {authToken} from './_helpers/jwt';

const router = Router();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT } = StatusCodes;

router.get("/", async (req: Request, res: Response) => {
    const user = req.query;    
    const builds = await Build.find(user);    
    return res.status(OK).json({builds});
});

router.get("/:id", async (req:Request, res: Response) => {
    const id  = req.params.id;
    const build = await Build.findById(id).exec();
    if(build === null){
        return res.status(NOT_FOUND).json({
            error: notFoundItem,
        })
    }
    return res.status(OK).json({build});
});
router.post("/create", authToken, async (req: Request, res: Response) => {
    const build = req.body;        
    if(!build){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const nwbuild = new Build(build);    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const result = await nwbuild.save().catch((err) => err);
    if(result === nwbuild){
        return res.status(CREATED).end();
    }else{
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    
})

router.delete("/delete/:id", authToken,async(req:Request, res: Response) => {
    const id = req.params.id;
    const deleted = await Build.findByIdAndDelete(id).exec();
    if(deleted === null){
        return res.status(NOT_FOUND).end();
    }
    return res.status(NO_CONTENT).end();
})

router.put("/:id", authToken, async (req:Request, res:Response)=> {
    const updatedBuild = req.body;
    const id = req.params.id;
    const updated = await Build.findByIdAndUpdate(id, updatedBuild).exec();
    if(updated === null){
        return res.status(NOT_FOUND).end();
    }else{
        res.status(NO_CONTENT).end();
    }
});


export default router;
