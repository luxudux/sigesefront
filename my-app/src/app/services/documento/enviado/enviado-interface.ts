export interface EnviadoInterface {
    id?: number;
    document_id?: number;
    active?: string;
    office_id?: number;
    office_name?: string;
    office_acronym?: string;
    office_delegation?: number;
    office_code?: number;
    office_mail?: string;
    conclution_id?: number;
    conclution_name?: string;
    preference_id?: number;
    preference_name?: string;

    document_office_id?: number;
    d_office_id?: number;
    state_id?: number;
    name?: string;
    icon?: string;
    color_icon?: string;
    created_at?: string;
    feedback?: string;
}
