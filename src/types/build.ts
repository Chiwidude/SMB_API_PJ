/* eslint-disable @typescript-eslint/no-unsafe-return */
import mongoose from "mongoose";

interface BuildDoc extends mongoose.Document{
    rating: string,
    title: string,
    gods: [],
    roles: [],
    user: string,
    date: string
}

interface IBuild {
    rating: string,
    title: string,
    gods: [],
    roles: [],
    user: string,
    date: string
}

interface buildModelInterface extends mongoose.Model<BuildDoc> {
    build(item:IBuild): BuildDoc    
}

const buildSchema = new mongoose.Schema({
    rating: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    gods: {
        type: []
    },
    roles: {
        type: []
    },
    user: {
        type: String
    },
    date: {
        type: String
    }
})

buildSchema.statics.build = (item: IBuild) => {
    return new Build(item);
}

const Build = mongoose.model<BuildDoc, buildModelInterface>('Build', buildSchema);

export {Build};