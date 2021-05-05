/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import {Guide} from '../types/guide';
import { Request, Response, Router } from 'express';
import { paramMissingError, notFoundItem} from '@shared/constants';
import {authToken} from './_helpers/jwt';
const router = Router();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT } = StatusCodes;

router.get("/", async (req: Request, res:Response)=> {
    const user = req.query;
    const guides = await Guide.find(user);
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

router.post("/create", authToken, async (req: Request, res:Response)=> {
    const guide = req.body;
    if(!guide){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }    
    const nwguide = Guide.build(guide);
   const result =  await nwguide.save().catch(err => err);
   if(result === nwguide){
    return res.status(CREATED).end(); 
   }else{
    return res.status(BAD_REQUEST).json({
        error: paramMissingError,
    });
   }
       
})

router.delete("/delete/:id", authToken, async(req:Request, res:Response)=> {
    const id = req.params.id;
    const deleted = await Guide.findByIdAndDelete(id).exec();
    if(deleted === null){
        return res.status(NOT_FOUND).end();
    }
    return res.status(NO_CONTENT).end();
})

router.put("/:id", authToken, async (req:Request, res:Response)=> {
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