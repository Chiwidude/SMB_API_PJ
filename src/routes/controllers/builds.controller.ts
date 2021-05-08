/* eslint-disable @typescript-eslint/no-misused-promises */
import dbBuilds from "../_helpers/BuildsDB";
import { paramMissingError, notFoundItem} from '@shared/constants';
import { Request, Response} from 'express';
import client from "../../shared/redis";
import StatusCodes from 'http-status-codes';
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR  } = StatusCodes;

export const getBuilds = (req:Request, res:Response) => {
    try {
        const user = req.query;
        if(user.user === undefined){
            client.get("allBuilds", async (err, reply) => {
                if(reply){
                    const builds = JSON.parse(reply);
                    return res.status(OK).json({builds});
                }else{
                    const builds = await dbBuilds.getBuilds(user);
                    setTimeout(() => {
                        console.log("data from db");
                        client.set("allBuilds", JSON.stringify(builds));
                        return res.status(OK).json({builds});                
                    }, 3000);           
                }
            })
        }else{ //when user comes in url query
            const usr = typeof user.user !== 'string'? "" : user.user;
            if(usr === user.user){
                client.get("builds "+usr, async (err, reply) => {
                    if(reply){
                        const builds = JSON.parse(reply);
                        return res.status(OK).json({builds});
                    }else{
                        const builds = await dbBuilds.getBuilds(user);                
                    setTimeout(() => {                
                        console.log("data from db");
                        client.set("builds "+ usr, JSON.stringify(builds));
                        return res.status(OK).json({builds});                
                    }, 3000);
                    }
                })
            }
        }
    }catch(err){
        return res.status(INTERNAL_SERVER_ERROR).json({error: err.message});
    }
}

export const getBuildWId = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        client.get("build "+id, async(err, reply) => {
            if(reply){
                const build = JSON.parse(reply);
                return res.status(OK).json({build});
            }else{
                const build = await dbBuilds.getBuildWId(id);
                if(!build){
                    return res.status(NOT_FOUND).json({
                        error: notFoundItem,
                    });
                }                
                setTimeout(() => {
                    console.log("data from db");
                    client.set("build "+id, JSON.stringify(build));
                    return res.status(OK).json({build});
                    }, 3000);
            }
        })
    }catch(err){
        res.status(INTERNAL_SERVER_ERROR).json({error: err.message});
    }
}

export const createBuild = async (req: Request, res:Response) => {
    try{
        const build = req.body;
        client.del("allBuilds");
        await dbBuilds.createBuild(build);
        return res.status(CREATED).end();
     
    }catch(err){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
}
export const deleteBuild = async (req: Request, res:Response) => {
    try{
        client.del("allBuilds");
        const id = req.params.id;
        const deleted = await dbBuilds.deleteBuild(id);
        if(deleted === null){
            return res.status(NOT_FOUND).end();
        }
         return res.status(NO_CONTENT).end();
    }catch(err){
        return res.status(INTERNAL_SERVER_ERROR).json({error: err.message});
    }
}

export const updateBuild = async (req: Request, res:Response) => {
    try {
        client.del("allBuilds");
        const updatedBuild = req.body;
        const id = req.params.id;
        const updated = await dbBuilds.updateBuild(id, updatedBuild);
        if(updated === null){
            return res.status(NOT_FOUND).end();
        }

        return res.status(NO_CONTENT).end();    
    }catch(err){
        return res.status(INTERNAL_SERVER_ERROR).json({error: err.message});
    }
}