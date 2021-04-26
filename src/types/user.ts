/* eslint-disable @typescript-eslint/no-unsafe-return */
import mongoose from "mongoose";

export interface UserDoc extends mongoose.Document{
    name: string,
    username: string,
    email: string,
    password: string,
    description: string
}

interface IUser {
    name: string,
    username: string,
    email: string,
    password: string,
    description: string
}

interface UserModelInterface extends mongoose.Model<UserDoc> {
    build(item:IUser): UserDoc    
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    username: {
        type: String,
        required: true
    }
    ,
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlegth:6
    },
    description: {
        type: String
    }
})

UserSchema.statics.build = (item: IUser) => {
    return new User(item);
}

const User = mongoose.model<UserDoc, UserModelInterface>('User', UserSchema);



export {User};