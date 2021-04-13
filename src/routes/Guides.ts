/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import {Guide} from '../types/guide';
import { Request, Response, Router } from 'express';
import { paramMissingError, notFoundItem} from '@shared/constants';
const router = Router();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT } = StatusCodes;

router.get("/", async (req: Request, res:Response)=> {
    const guides = await Guide.find({});
    return res.status(OK).json({guides});
})

router.get("/:id", async(req: Request, res:Response) => {
    const id = req.params.id;
    const guide = await Guide.findById(id).exec();
    if(guide === null){
        return res.status(NOT_FOUND).json({
            error: notFoundItem,
        })
    }
    return res.status(OK).json({guide});
})

router.post("/create", async (req: Request, res:Response)=> {
    const guide = req.body;
    if(!guide){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }    
    const nwguide = Guide.build(guide);
   const result =  await nwguide.save();
   if(result === nwguide){
    return res.status(CREATED).end(); 
   }else{
    return res.status(BAD_REQUEST).json({
        error: paramMissingError,
    });
   }
       
})

router.delete("/delete/:id", async(req:Request, res:Response)=> {
    const id = req.params.id;
    const deleted = await Guide.findByIdAndDelete(id).exec();
    if(deleted === null){
        return res.status(NOT_FOUND).end();
    }
    return res.status(NO_CONTENT).end();
})

router.put("/:id", async (req:Request, res:Response)=> {
    const updatedGuide = req.body;
    const id = req.params.id;
    const updated = await Guide.findByIdAndUpdate(id, updatedGuide).exec();
    if(updated === null){
        return res.status(NOT_FOUND).end();
    }else{
        res.status(NO_CONTENT).end();
    }
})
export default router;