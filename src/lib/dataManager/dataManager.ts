import { DataManagerType, NameType } from "./data";
import { getAlphabetsArray } from "../alphabet/alphabet";
import ApiManager from "../apiManager/apiManager";
import AsyncStorage from "@react-native-community/async-storage";

export default class DataManager {
    static async storeData(key: string, data: string): Promise<void> {
        await AsyncStorage.setItem(key, data);
    }

    static async getData(key: string): Promise<DataManagerType> {
        try {
            const data = await AsyncStorage.getItem(key);
            if (data) {
                return JSON.parse(data);
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }

    static async removeMultipleData(key: string[]): Promise<void> {
        await AsyncStorage.multiRemove(key);
    }

    static async initialiseApp(): Promise<boolean> {
        let isFetchingError: boolean = false;

        try {
            const names: NameType[] = await DataManager.getAllNames();
            await DataManager.storeAllNames(names);
            await DataManager.storeData("@app", JSON.stringify({ isInitialised: true }));
            isFetchingError = true;
        } catch (e) {
            isFetchingError = false;
        }

        return isFetchingError;
    }

    static async getAllNames(): Promise<any[]> {
        const alphabets = getAlphabetsArray();
        return Promise.all(alphabets.map(alphabet => ApiManager.fetchName(alphabet)))
            .then(responses => ApiManager.processNameResponse(responses));
    }

    static async storeAllNames(names: NameType[]): Promise<void[]> {
        const alphabets = getAlphabetsArray();
        return Promise.all(
            names.map((name, index) => DataManager.storeData(`@name/${alphabets[index]}`,
                JSON.stringify({ name })))
        );
    }

    static async refreshNamesDb(): Promise<boolean> {
        let isFetchingError: boolean = false;

        try {
            await DataManager.storeData("@app", JSON.stringify({ isInitialised: false }));
            const names: NameType[] = await DataManager.getAllNames();
            const namesKeys = getAlphabetsArray().map(alphabet => `@name/${alphabet}`);
            await DataManager.removeMultipleData(namesKeys);
            await DataManager.storeAllNames(names);
            await DataManager.storeData("@app", JSON.stringify({ isInitialised: true }));
            isFetchingError = true;
        } catch (e) {
            isFetchingError = false;
        }

        return isFetchingError;
    }
}
