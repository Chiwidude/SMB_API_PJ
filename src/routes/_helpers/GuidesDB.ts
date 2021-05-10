/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {Guide} from '../../types/guide';

const getGuides = async (user:any) => {
    try {
        const Guides = await Guide.find(user);
        return Guides;
    }catch(err:any){
        return err;
    }    
}

const getGuideWId = async (id:string) => {
    try{
        const guide = await Guide.findById(id).exec();
        return guide;
    }catch(err:any){
        return err;
    }
}

const createGuide = async (nGuide :any) =>{
    try {
        const newGuide = Guide.build(nGuide);
        const created = await newGuide.save();
        return created;
    }catch(err: any){
        return err;
    }
}

const deleteGuide = async (id: string) =>{
    try {
        const deleted = await Guide.findByIdAndDelete(id).exec();
        return deleted;   
    }catch(err:any){
        return err;
    }    
}

const updateGuide = async (id:string, guide:any) => {
    try{
        const updated = await Guide.findByIdAndUpdate(id, guide).exec();
        return updated;
    }catch(err:any){
        return err;
    }
}


const dbGuides =  {
    getGuides,
    getGuideWId,
    createGuide,
    deleteGuide,
    updateGuide
}

export default dbGuides;