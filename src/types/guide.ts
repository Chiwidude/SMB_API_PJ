/* eslint-disable @typescript-eslint/no-unsafe-return */
import mongoose from "mongoose";

interface GuideDoc extends mongoose.Document{
    rating: string,
    title: string,
    gods: [],
    roles: [],
    user: string,
    date: string
}

interface IGuide {
    rating: string,
    title: string,
    gods: [],
    roles: [],
    user: string,
    date: string
}

interface guideModelInterface extends mongoose.Model<GuideDoc> {
    build(item:IGuide): GuideDoc    
}

const guideSchema = new mongoose.Schema({
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

guideSchema.statics.build = (item: IGuide) => {
    return new Guide(item);
}

const Guide = mongoose.model<GuideDoc, guideModelInterface>('Guide', guideSchema);



export {Guide};