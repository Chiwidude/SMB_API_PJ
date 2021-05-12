"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient({ port: 6379, host: 'localhost' });
client.on("connect", function (error) {
    if (error) {
        console.error(error);
    }
    console.log("connected to Redis server");
});
client.on("ready", function (error) {
    console.log("Redis server ready to use");
});
client.on("error", function (error) {
    console.error(error);
});
client.on("end", function (error) {
    console.error("Client disconnected from Redis server");
});
process.on("SIGINT", function (error) {
    client.quit();
});
exports.default = client;
