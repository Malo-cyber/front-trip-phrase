import { Country } from "./country";


export interface Phrase{
    id?:number;
    code_langue : string;
    langue: Country;
    phrase:string;
}