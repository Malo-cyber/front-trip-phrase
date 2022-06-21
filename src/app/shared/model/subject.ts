import { Reference } from "./reference";

export interface Subject{
    id:number;
    subjectReference: Reference;
    references?: Reference[];
}