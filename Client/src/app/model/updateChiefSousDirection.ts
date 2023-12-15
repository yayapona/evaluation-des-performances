import {sousDirectionModel} from '../model/Sous-directionModel'

export class chiefSousDirectionModel {
    id!:number;
    sous_direction_id!: sousDirectionModel;
    matricule!: string;
    date_debut!:string;
    status!: number;
    date_fin!: string
}