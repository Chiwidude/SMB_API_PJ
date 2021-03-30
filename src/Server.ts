/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-len */
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotdev from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import BaseRouter from './routes';
import logger from '@shared/Logger';

const app = express();
const { BAD_REQUEST } = StatusCodes;

dotdev.config();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@cluster0.boam6.mongodb.net/Smite_DB?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( ()=> console.log("connected to db")).catch(err => {console.error("Connection error", err.stack); process.exit(1)});
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api/v1', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

// Export express instance
export default app;
