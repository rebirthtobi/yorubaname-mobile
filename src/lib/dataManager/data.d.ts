export interface AppInfoType {
    isInitialised: boolean;
}

export interface EtymologyType {
    part: string;
    meaning: string;
}

export interface GeoLocationType {
    place: string;
    region: string;
}

export interface NameType {
    id: number;
    name: string;
    meaning: string;
    extendedMeaning: string;
    morphology: string;
    geoLocation: GeoLocationType[];
    famousPeople: string;
    variants: string;
    media: string;
    etymology: EtymologyType[];
}

export interface ItemType {
    name: NameType[];
}

export type DataManagerType =  AppInfoType | ItemType | null;
