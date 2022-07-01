import { Phrase } from "./phrase";


export interface Reference {
    id:number;
    reference:string;
    image:string;
    phrases: Phrase[];
}