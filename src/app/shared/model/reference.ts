import { Subject } from "./subject";
import { Phrase } from "./phrase";


export interface Reference {
    id:number;
    reference:string;
    image:string;
    subject: Subject;
    phrases: Phrase[]
}