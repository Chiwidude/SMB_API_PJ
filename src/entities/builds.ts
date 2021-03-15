import {Build} from "../types/types"

const builds: Build[] = [];
export interface Ibuild {rating: string, title: string, gods:[], 
    roles:[], user:string, date:string, id:number}

export const addBuild = async (newBuild: Build) : Promise<void> => {
    await  new Promise (resolve => {setTimeout(() => { resolve("getting builds")}, 500)});
    builds.push(newBuild);
}

export const getBuilds = async (): Promise<Build[]> => {
    await  new Promise (resolve => {setTimeout(() => { resolve("getting builds")}, 500)});
    return builds;
}

export const getBuild = async (id:number):Promise<Build | undefined> => {
    await  new Promise (resolve => {setTimeout(() => { resolve("getting builds")}, 500)});
    const buildSearched = builds.find(x => x.id === id);
    return buildSearched;
}

export const deleteBuild = async (id:number): Promise<boolean> => {
    await  new Promise (resolve => {setTimeout(() => { resolve("getting builds")}, 500)});
    const dBuild = builds.findIndex( x => x.id === id);
    if(dBuild === -1){
        return false;
    }else{
        builds.splice(dBuild,1);
        return true;
    }
}
export const updateBuild = async (id:number, newBuild:Build) :Promise<boolean> => {
    await  new Promise (resolve => {setTimeout(() => { resolve("getting builds")}, 500)});
    const oldBuild = builds.findIndex(x => x.id === id);
    if( oldBuild === -1){
        return false;
    }else{
        builds[oldBuild] = newBuild;
        return true;
    }
}