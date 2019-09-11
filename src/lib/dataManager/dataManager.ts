import { DataManagerType, NameType } from "./data";
import ApiManager from "../apiManager/apiManager";
import AsyncStorage from "@react-native-community/async-storage";

const alphabet = "abdefghijklmnoprstuwy";

export function getAlphabetsArray(): string[] {
    const alphabetArray = alphabet.split("");
    alphabetArray.splice(4, 0, "ẹ");
    alphabetArray.splice(7, 0, "gb");
    alphabetArray.splice(16, 0, "ọ");
    alphabetArray.splice(20, 0, "ṣ");

    return alphabetArray;
}

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
            const names: NameType[] = await this.getAllNames();
            await this.storeAllNames(names);
            await this.storeData("@app", JSON.stringify({ isInitialised: true }));
        } catch (e) {
            isFetchingError = true;
        }

        return isFetchingError;
    }

    static async getAllNames(): Promise<any[]> {
        const alphabets = getAlphabetsArray();
        return Promise.all(alphabets.map(alphabet => ApiManager.fetchName(alphabet)))
            .then(responses => ApiManager.processNameResponse(responses))
            .then(names => this.storeAllNames(names));
    }

    static async storeAllNames(names: NameType[]): Promise<void[]> {
        const alphabets = getAlphabetsArray();
        return Promise.all(
            names.map((name, index) => this.storeData(`@name/${alphabets[index]}`,
                JSON.stringify({ name })))
        );
    }

    static async refreshNamesDb(): Promise<boolean> {
        let isFetchingError: boolean = false;

        try {
            await this.storeData("@app", JSON.stringify({ isInitialised: false }));
            const names: NameType[] = await this.getAllNames();
            const namesKeys = getAlphabetsArray().map(alphabet => `@name/${alphabet}`);
            await this.removeMultipleData(namesKeys);
            await this.storeAllNames(names);
            await this.storeData("@app", JSON.stringify({ isInitialised: true }));
        } catch (e) {
            isFetchingError = true;
        }

        return isFetchingError;
    }
}
