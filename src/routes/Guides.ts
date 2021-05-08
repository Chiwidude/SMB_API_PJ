/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import {Guide} from '../types/guide';
import { Request, Response, Router } from 'express';
import { paramMissingError, notFoundItem} from '@shared/constants';
import {authToken} from './_helpers/jwt';
import client from "../shared/redis";
const router = Router();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT } = StatusCodes;

router.get("/", (req: Request, res:Response)=> {
    const user = req.query;
    if(user.user === undefined){
        client.get("allGuides", async (err, reply) => {
            if(reply){
                const guides = JSON.parse(reply);                
                return res.status(OK).json({guides});
            }else{
                const guides = await Guide.find(user);
                client.set("allGuides", JSON.stringify(guides));
                setTimeout(() => {
                    console.log("data from db");
                    return res.status(OK).json({guides});                
                }, 3000);           
            }
        })
    }else{
        const usr = typeof user.user !== 'string'? "" : user.user;
        if(usr === user.user){
            client.get("guides "+usr, async (err, reply) => {
                if(reply){
                    const guides = JSON.parse(reply);
                    return res.status(OK).json({guides});
                }else{
                    const guides = await Guide.find(user);
                client.set("guides "+ usr, JSON.stringify(guides));
                setTimeout(() => {
                    console.log("data from db");
                    return res.status(OK).json({guides});                
                }, 3000);
                }
            })
        }
    }
})

router.get("/:id", (req: Request, res:Response) => {
    const id = req.params.id;
    client.get("guide "+id, async (err, reply) => {
        if(reply){
            const guide = JSON.parse(reply);
            return res.status(OK).json({guide});
        }else{
            const guide = await Guide.findById(id).exec();
            if(guide === null){
                return res.status(NOT_FOUND).json({
                    error: notFoundItem,
                })
            }            
            client.set("guide "+id, JSON.stringify(guide));
            setTimeout(() => {
            console.log("data from db", guide);
            return res.status(OK).json({guide});
            }, 3000); 
        }
    });
   
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
    client.exists("allGuides", (err, reply)=> {
        if(reply){
         client.del("allGuides");
        }           
    });
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
    client.exists("allGuides", (err, reply)=> {
        if(reply){
         client.del("allGuides");
        }           
    });
    return res.status(NO_CONTENT).end();
})

router.put("/:id", authToken, async (req:Request, res:Response)=> {
    const updatedGuide = req.body;
    const id = req.params.id;
    const updated = await Guide.findByIdAndUpdate(id, updatedGuide).exec();
    if(updated === null){
        return res.status(NOT_FOUND).end();
    }else{
        client.exists("allGuides", (err, reply)=> {
            if(reply){
             client.del("allGuides");
            }           
        });
        res.status(NO_CONTENT).end();
    }
})
export default router;