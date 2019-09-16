import * as Sentry from "@sentry/react-native";
import { DataManagerType, ItemType, NameType } from "../dataManager/data";
import DataManager, { getAlphabetsArray } from "../dataManager/dataManager";

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

export async function getSearchResult(searchKey: string, searchText: string): Promise<any> {
    let searchResult: NameType[] | [] = [];

    try {
        const searchableData: DataManagerType = await DataManager.getData(`@name/${searchKey}`) as ItemType;
        searchResult = searchableData.name.filter((data: NameType) => data.name.includes(searchText));
    } catch (e) {
        Sentry.configureScope(scope => {
            Sentry.captureMessage("getting name list from async storage failed");
            scope.setExtra("searchKey", searchKey);
            scope.setExtra("searchText", searchText);
            Sentry.captureException(e);
        });
        searchResult = [];
    }
    return searchResult;
}
