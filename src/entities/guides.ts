import {Guide} from '../types/types';
const guides: Guide[] = [];

export const getGuides = async () : Promise<Guide[]> => {
    await  new Promise (resolve => {setTimeout(() => { resolve("getting builds")}, 500)});
    return guides;
}
export const addGuide = async (newGuide: Guide) : Promise<void> => {
    await  new Promise (resolve => {setTimeout(() => { resolve("getting builds")}, 500)});
    guides.push(newGuide);
}

export const getGuide = async (id: number): Promise<Guide | undefined> => {
    await  new Promise (resolve => {setTimeout(() => { resolve("getting builds")}, 500)});
    const guide = guides.find(x => x.id === id);
    return guide;
}

export const deleteGuide = async (id:number) : Promise<boolean> => {
    await  new Promise (resolve => {setTimeout(() => { resolve("getting builds")}, 500)});
    const indexOf = guides.findIndex(x => x.id === id);
    if(indexOf > 0){
        guides.splice(indexOf,1);
        return true;
    }
    return false;
}

export const updateGuide = async(id:number, newGuide:Guide):Promise<boolean> => {
    await  new Promise (resolve => {setTimeout(() => { resolve("getting builds")}, 500)});
    const oldguide = guides.findIndex(x => x.id === id);
    if( oldguide === -1){
        return false;
    }else{
        guides[oldguide] = newGuide;
        return true;
    }
}
