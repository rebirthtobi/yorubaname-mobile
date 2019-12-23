import {getAlphabetsArray} from "../alphabet/alphabet";
import { DataManagerType, ItemType, NameType } from "../dataManager/data";
import DataManager from "../dataManager/dataManager";

export interface SearchProps {
    isSearchable: boolean;
    searchKey: string;
}

function getLowerCaseLetter(word: string) {
    const zeroIndex = 0;
    const smallAWithGraveUTFCode = 224;
    const smallYWithAcuteUTFCode = 253;
    const aWithGraveUTFCode = 192;
    const yWithAcuteUTFCode = 221;
    const utfCodeDifference = 32;
    const searchKeyCharCode = word.charCodeAt(zeroIndex);
    let searchKey = "";

    if (searchKeyCharCode >= smallAWithGraveUTFCode && searchKeyCharCode <= smallYWithAcuteUTFCode) {
        searchKey = word.charAt(zeroIndex);
    } else if (searchKeyCharCode >= aWithGraveUTFCode && searchKeyCharCode <= yWithAcuteUTFCode) {
        searchKey = String.fromCharCode(searchKeyCharCode + utfCodeDifference);
    } else {
        searchKey = word.charAt(zeroIndex).toLowerCase();
    }

    return searchKey;
}

export function getSearchStringProps(searchText: string): SearchProps {
    if (!searchText || (typeof searchText !== "string") || !searchText.trim()) {
        return {
            isSearchable: false,
            searchKey:    "",
        };
    }
    const zeroIndex = 0;
    const substringLength = 2;

    if (searchText.substring(zeroIndex, substringLength).toLowerCase() === "gb") {
        return {
            isSearchable: true,
            searchKey:    "gb",
        };
    }

    const searchKey = getLowerCaseLetter(searchText);
    const isSearchable = getAlphabetsArray().includes(searchKey);
    return {
        isSearchable,
        searchKey: isSearchable ? searchKey : "",
    };
}

export async function getSearchResult(searchKey: string, searchText: string): Promise<NameType[] | [] > {
    let searchResult: NameType[] | [] = [];

    try {
        const searchableData: DataManagerType = await DataManager.getData(`@name/${searchKey}`) as ItemType;
        searchResult = searchableData.name.filter((data: NameType) => {
            const isMatch = getNormalizedString(data.name).match(RegExp(getNormalizedString(searchText), "gi"));
            return isMatch && isMatch.length;
        });
    } catch (e) {
        searchResult = [];
    }
    return searchResult;
}

function getNormalizedString(sentence: string): string {
    return sentence.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
