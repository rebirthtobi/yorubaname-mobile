export interface ObjectIndex {
    [key: string]: string;
}

export interface LanguageItemType {
    code: string;
    name: string;
    translation: ObjectIndex;
}

export interface LanguageTypes {
    [key: string]: LanguageItemType;
}
