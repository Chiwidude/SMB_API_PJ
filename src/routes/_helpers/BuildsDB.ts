/* eslint-disable @typescript-eslint/no-unsafe-return */
import {Build} from '../../types/build';

const getBuilds = async (user:any) => {
    try {
        const builds = await Build.find(user);
        return builds;
    }catch(err:any){
        return err;
    }    
}

const getBuildWId = async (id:string) => {
    try{
        const build = Build.findById(id).exec();
        return build;
    }catch(err:any){
        return err;
    }
}

const createBuild = async (nbuild : any) =>{
    try {
        const newBuild = Build.build(nbuild);
        const created = await newBuild.save();
        return created;
    }catch(err: any){
        return err;
    }
}

const deleteBuild = async (id: string) =>{
    try {
        const deleted = Build.findByIdAndDelete(id).exec();
        return deleted;   
    }catch(err:any){
        return err;
    }    
}

const updateBuild = async (id:string, build:any) => {
    try{
        const updated = await Build.findByIdAndUpdate(id, build).exec();
        return updated;
    }catch(err:any){
        return err;
    }
}


const dbBuilds =  {
    getBuilds,
    getBuildWId,
    createBuild,
    deleteBuild,
    updateBuild
}

export default dbBuilds;