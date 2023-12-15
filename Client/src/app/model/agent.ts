import { directionModel } from '../model/directionModel';
import { sousDirectionModel } from '../model/Sous-directionModel';
import { serviceModel } from '../model/serviceModel';

export class agentModel {
    id!: number
    nom!:string;
    prenom!: string;
    email!: string;
    matricule!: string; 
    fonction!: string;
    direction!: directionModel
    sous_direction!: sousDirectionModel ;    
    servic!: serviceModel;
    rang!: string
}