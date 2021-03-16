/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import {Guide} from '../types/types';
import { Request, Response, Router } from 'express';
import { getRandomInt } from '@shared/functions';
import { paramMissingError, CustomRequest, notFoundItem} from '@shared/constants';
import {getGuides, addGuide, getGuide, deleteGuide, updateGuide} from '../entities/guides';
const router = Router();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT } = StatusCodes;

router.get("/", async (req: Request, res:Response)=> {
    const guides = await getGuides();
    return res.status(OK).json({guides});
})

router.get("/:id", async(req: Request, res:Response) => {
    const id = +req.params.id;
    const guide = await getGuide(id);
    if(!guide){
        return res.status(NOT_FOUND).json({
            error: notFoundItem,
        })
    }
    return res.status(OK).json({guide});
})

router.post("/add", async (req: CustomRequest<Guide>, res:Response)=> {
    const guide = req.body;
    if(!guide){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    guide.id = getRandomInt();
    await addGuide(guide);
    return res.status(CREATED).end();    
})

router.delete("/delete/:id", async(req:Request, res:Response)=> {
    const id = +req.params.id;
    const deleted = await deleteGuide(id);
    if(!deleted){
        return res.status(NOT_FOUND).end();
    }
    return res.status(NO_CONTENT).end();
})

router.put("/:id", async (req:CustomRequest<Guide>, res:Response)=> {
    const updatedGuide = req.body;
    const id:number = +req.params.id;
    const updated = await updateGuide(id, updatedGuide);
    if(!updated){
        return res.status(NOT_FOUND).end();
    }else{
        res.status(NO_CONTENT).end();
    }
})
export default router;