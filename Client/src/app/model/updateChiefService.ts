import {serviceModel} from '../model/serviceModel';

export class updateChiefServiceModel {
    id!: number;
    servic!:serviceModel;
    matricule!: string
    date_debut!: Date;
    date_fin!: Date;
    status!:number;
}