import { agentModel } from './agent'
export class contratModel {
    id!:number;
    annee_contrat!: Date;
    estitulaire!: string;
    statut_contrat!: string;
    agent_fonction!: string;
    nom_evalue!: string;
    prenom_evalue!: string;
    matricule_evalue!: string
    nom_evaluateur!: string;
    prenom_evaluateur!: string ;
    matriclue_evaluateur!: string ;
    evaluateur_fonction!: string ;
    date_valide!: Date ;
    date_evalue!: Date ;
    date_soumis! : Date;
    creepar!: string;
    agent!: agentModel
    
}