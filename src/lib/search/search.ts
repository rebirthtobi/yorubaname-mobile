import { DataManagerType, ItemType, NameType } from "../dataManager/data";
import DataManager, { getAlphabetsArray } from "../dataManager/dataManager";

export interface SearchProps {
    isSearchable: boolean;
    searchKey: string;
}

export function getSearchStringProps(searchText: string): SearchProps {
    if (!searchText || !searchText.trim()) {
        return {
            isSearchable: false,
            searchKey:    "",
        };
    }
    const zeroIndex = 0;
    const substringLength = 2;

    if (searchText.substring(zeroIndex, substringLength) === "gb") {
        return {
            isSearchable: true,
            searchKey:    "gb",
        };
    }

    const searchKey = searchText.charAt(zeroIndex).toLowerCase();
    return {
        isSearchable: getAlphabetsArray().includes(searchKey),
        searchKey,
    };
}

export async function getSearchResult(searchKey: string, searchText: string): Promise<any> {
    const searchableData: DataManagerType = await DataManager.getData(`@name/${searchKey}`) as ItemType;
    return searchableData.name.filter((data: NameType) => data.name.includes(searchText));
}
