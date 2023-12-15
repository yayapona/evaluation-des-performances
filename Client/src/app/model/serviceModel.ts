import {sousDirectionModel} from '../model/Sous-directionModel';

export class serviceModel {
    id!: number;
    code_service!:number;
    sous_direction!:sousDirectionModel;
    libelle_court!: string;
    libelle_long!: string; 
}