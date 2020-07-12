import { OficinaInterface } from './oficina-interface';

export interface OficinaGroupInterface {
    disabled?: boolean;
    nombreGrupo: string;
    oficina: OficinaInterface[];
}
