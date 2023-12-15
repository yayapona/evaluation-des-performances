import { domaineModel } from '../model/domaine';
import { directionModel } from './directionModel';
export class critereModel {
    id!: number ;
    domaine!: domaineModel;
    libelle_critere!: string;
    direction!: directionModel
}