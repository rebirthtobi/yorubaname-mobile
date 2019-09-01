export interface AppInfoType {
    isInitialised: boolean;
}

export interface NameType {
    id: number;
    name: string;
    meaning: string;
    extendedMeaning: string;
    morphology: string;
    geoLocation: {};
    famousPeople: string;
    variants: string;
    media: string;
    etymology: {};
}

export interface ItemType {
    name: NameType[];
}

export type DataManagerType =  AppInfoType | ItemType | null;
