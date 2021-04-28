/* eslint-disable max-len */
import {sign, verify} from 'jsonwebtoken'
import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction} from 'express';
const { FORBIDDEN} = StatusCodes;

export const generateAToken = (username:Record<string,unknown>) => sign(username, process.env.keywrd as string, {expiresIn: '1d'});

export const authToken = (req:Request, res:Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];    
    if(typeof(token) === 'undefined') return res.status(FORBIDDEN).json({"err":"no token"});

    verify(token, process.env.keywrd as string, (err: any, data: any) => {
        if(err) return res.status(FORBIDDEN).json({"err":"could not validate token",
    "token":token});
        delete data["iat"]
        delete data["exp"];
        const newtoken = generateAToken(data);
        res.setHeader('authorization', newtoken);
        next();

    })
}