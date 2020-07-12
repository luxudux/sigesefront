export interface NotificadoInterface {

    id?: number;
    document_id?: number;
    subject?: string;
    control?: string;
    url?: string;
    expiration?: string;
    active?: string;

    remitente_id?: number;
    remitente_name?: string;
    remitente_del?: number;
    office_id?: number;
    office_name?: string;
    office_delegation?: number;

    conclution_id?: number;
    conclution_name?: string;
    preference_id?: number;
    preference_name?: string;
    leido?: string;

    state_id?: number;
    workers?: number[];
    feedback?: string;
}
