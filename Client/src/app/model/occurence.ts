import { indicateurModel } from "./indicateur";

export class occurenceModel {
    id!:number;
    indicateur!: indicateurModel;
    libelle_occurence!:string;
    note!: number
}