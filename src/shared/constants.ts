import { Request } from 'express';


export const paramMissingError = 'One or more of the required parameters was missing.';
export const notFoundItem = "There's not such item in our database";
export interface CustomRequest<T> extends Request {
    body: T
}
