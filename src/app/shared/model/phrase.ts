import { Reference } from "./reference";


export interface Phrase{
    id:number;
    code_langue: string;
    phrase:string;
    reference? : Reference;
}