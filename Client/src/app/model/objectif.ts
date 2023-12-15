import { critereModel } from '../model/critere';
import { contratModel } from './contrat';
import { indicateurModel } from './indicateur';


export class objectifModel {
   id!: number;
   critere!: critereModel
   indicateur!: indicateurModel;
   note_alloue!: number;
   libelle_objectifs!: string;
   contrat!: contratModel ;
   note_obtenue!: number ;
   note_ponderee!: string;
   idOccurrence! : number

}