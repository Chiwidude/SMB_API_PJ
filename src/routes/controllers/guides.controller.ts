/* eslint-disable @typescript-eslint/no-misused-promises */
import dbGuides from "../_helpers/GuidesDB";
import { paramMissingError, notFoundItem} from '@shared/constants';
import { Request, Response} from 'express';
import client from "../../shared/redis";
import StatusCodes from 'http-status-codes';
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR  } = StatusCodes;

export const getGuides = (req:Request, res:Response) => {
    try {
        const user = req.query;
        if(user.user === undefined){
            client.get("allGuides", async (err, reply) => {
                if(reply){
                    const guides = JSON.parse(reply);
                    return res.status(OK).json({guides});
                }else{
                    const guides = await dbGuides.getGuides(user);
                    setTimeout(() => {
                        console.log("data from db");
                        client.set("allGuides", JSON.stringify(guides));
                        return res.status(OK).json({guides});                
                    }, 3000);           
                }
            })
        }else{ //when user comes in url query
            const usr = typeof user.user !== 'string'? "" : user.user;
            if(usr === user.user){
                client.get("guides "+usr, async (err, reply) => {
                    if(reply){
                        const guides = JSON.parse(reply);
                        return res.status(OK).json({guides});
                    }else{
                        const guides = await dbGuides.getGuides(user);                
                    setTimeout(() => {                
                        console.log("data from db");
                        client.set("guides "+ usr, JSON.stringify(guides));
                        return res.status(OK).json({guides});                
                    }, 3000);
                    }
                })
            }
        }
    }catch(err){
        return res.status(INTERNAL_SERVER_ERROR).json({error: err.message});
    }
}

export const getGuideWId = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        client.get("guide "+id, async(err, reply) => {
            if(reply){
                const guide = JSON.parse(reply);
                return res.status(OK).json({guide});
            }else{
                const guide = await dbGuides.getGuideWId(id);
                if(!guide){
                    return res.status(NOT_FOUND).json({
                        error: notFoundItem,
                    });
                }                
                setTimeout(() => {
                    console.log("data from db");
                    client.set("guide "+id, JSON.stringify(guide));
                    return res.status(OK).json({guide});
                    }, 3000);
            }
        })
    }catch(err){
        res.status(INTERNAL_SERVER_ERROR).json({error: err.message});
    }
}

export const createGuide = async (req: Request, res:Response) => {
    try{
        const guide = req.body;
        client.del("allGuides");
        await dbGuides.createGuide(guide);
        return res.status(CREATED).end();
     
    }catch(err){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
}
export const deleteGuide = async (req: Request, res:Response) => {
    try{
        client.del("allGuides");
        const id = req.params.id;
        const deleted = await dbGuides.deleteGuide(id);
        if(deleted === null){
            return res.status(NOT_FOUND).end();
        }
         return res.status(NO_CONTENT).end();
    }catch(err){
        return res.status(INTERNAL_SERVER_ERROR).json({error: err.message});
    }
}

export const updateGuide = async (req: Request, res:Response) => {
    try {
        client.del("allGuides");
        const updatedGuide = req.body;
        const id = req.params.id;
        const updated = await dbGuides.updateGuide(id, updatedGuide);
        if(updated === null){
            return res.status(NOT_FOUND).end();
        }

        return res.status(NO_CONTENT).end();    
    }catch(err){
        return res.status(INTERNAL_SERVER_ERROR).json({error: err.message});
    }
}