"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-len */
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
require("express-async-errors");
const routes_1 = __importDefault(require("./routes"));
const Logger_1 = __importDefault(require("@shared/Logger"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const { BAD_REQUEST, UNAUTHORIZED } = http_status_codes_1.default;
const options = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'authorization',
        'user'
    ], exposedHeaders: ['authorization'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
};
dotenv_1.default.config();
/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use(cors_1.default(options));
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
    mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@cluster0.boam6.mongodb.net/Smite_DB?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => console.log("connected to db dev")).catch((err) => { console.error("Connection error", err.stack); process.exit(1); });
}
// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet_1.default());
    mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@cluster0.boam6.mongodb.net/Smite_DB?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => console.log("connected to db prod")).catch((err) => { console.error("Connection error", err.stack); process.exit(1); });
}
if (process.env.NODE_ENV === 'test') {
    mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@cluster0.boam6.mongodb.net/Smite_Test?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => console.log("connected to db test")).catch((err) => { console.error("Connection error", err.stack); process.exit(1); });
}
// Add APIs
app.use('/api/v1', routes_1.default);
// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    Logger_1.default.err(err, true);
    if (err.name === 'UnauthorizedError')
        return res.status(UNAUTHORIZED).json({ error: err.message });
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});
// Export express instance
exports.default = app;
