/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import {generateAToken, authToken} from './_helpers/jwt';
import { paramMissingError} from '@shared/constants';
import {hash, genSalt, compare} from 'bcrypt'
import {User} from '../types/user';
const router = Router();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;

router.post("/signup", async(req:Request, res:Response) => {
    const body = req.body;

    if(body === null){
        return res.status(NOT_FOUND).json({
            error: "no data was sent",
        })
    }
    const notUniqueEmail = await User.findOne({email: body.email});
    if(notUniqueEmail){
        return res.status(BAD_REQUEST).json({error: "Email is already registered"});
    }
    const newUser = User.build(body);
    const salt = await genSalt(10);
    newUser.password = await hash(newUser.password,salt);
    const user = await newUser.save().catch(err => err);
    if(user === newUser){
        return res.status(CREATED).end(); 
       }else{
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
       }
});

router.post("/login", async (req: Request, res: Response) => {
    const body = req.body;
    const user = await User.findOne({email: body.email}).exec();
    if(!user){
        return res.status(BAD_REQUEST).json({error: "Invalid user or Password"});
    }
    const validPwd = await compare(body.password, user.password);
    if(!validPwd) return res.status(BAD_REQUEST).json({error: "Invalid user or Password"});
    const token = generateAToken({
        name: user.name,
        id: user._id
    });    
    return res.status(OK).json({token, username:user.username }).end();
});

router.get("/authorize", authToken, (req:Request, res:Response)=> {
    return res.status(OK).end();
});


export default router;