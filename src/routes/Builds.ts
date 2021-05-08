/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import {Build} from '../types/build';
import { Request, Response, Router } from 'express';
import { paramMissingError, notFoundItem} from '@shared/constants';
import {authToken} from './_helpers/jwt';
import client from "../shared/redis";
const router = Router();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT } = StatusCodes;

router.get("/",  (req: Request, res: Response) => {    
    const user = req.query;
    if(user.user === undefined){        
        client.get("allBuilds", async (err, reply) => {
            if(reply){
                const builds = JSON.parse(reply);                
                return res.status(OK).json({builds});
            }else{                
                const builds = await Build.find(user);
                client.set("allBuilds", JSON.stringify(builds));
                setTimeout(() => {console.log("data from db");
                return res.status(OK).json({builds});
                }, 3000);
            }
        })
    }else{
        const usr = typeof user.user !== 'string'? "" : user.user;
        if(usr === user.user){
            client.get("builds "+usr, async (err, reply) => {
                if(reply){
                    const builds = JSON.parse(reply);                    
                    return res.status(OK).json({builds});
                }else{
                    const builds = await Build.find(user);
                    client.set("builds "+usr, JSON.stringify(builds));
                    setTimeout(() => {console.log("data from db");
                    return res.status(OK).json({builds});
                    }, 3000);
                    
                }
            })
        }
    }
});

router.get("/:id",  (req:Request, res: Response) => {
    const id  = req.params.id;
    client.get("build "+id, async (err, reply)=> {
        if(reply){
            const build = JSON.parse(reply);            
            return res.status(OK).json({build});
        }else{
            const build = await Build.findById(id).exec();            
            if(build === null){
                return res.status(NOT_FOUND).json({
                    error: notFoundItem,
                })
            }
            client.set("build "+id, JSON.stringify(build));
            setTimeout(() => {console.log("data from db");
            return res.status(OK).json({build});
            }, 3000);            
        }
    });

});
router.post("/create", authToken, async (req: Request, res: Response) => {
    const build = req.body;        
    if(!build){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const nwbuild = Build.build(build);    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const result = await nwbuild.save().catch((err) => err);
    if(result === nwbuild){
       client.exists("allBuilds", (err, reply)=> {
           if(reply){
            client.del("allBuilds");
           }           
       });
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
    client.exists("allBuilds", (err, reply)=> {
        if(reply){
         client.del("allBuilds");
        }           
    });
    return res.status(NO_CONTENT).end();
})

router.put("/:id", authToken, async (req:Request, res:Response)=> {
    const updatedBuild = req.body;
    const id = req.params.id;
    const updated = await Build.findByIdAndUpdate(id, updatedBuild).exec();
    if(updated === null){
        return res.status(NOT_FOUND).end();
    }else{
        client.exists("allBuilds", (err, reply)=> {
            if(reply){
             client.del("allBuilds");
            }           
        });
        res.status(NO_CONTENT).end();
    }
});


export default router;
