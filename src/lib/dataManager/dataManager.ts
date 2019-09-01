import { DataManagerType } from "./data";
import AsyncStorage from "@react-native-community/async-storage";
import Urls from "../urls/urls";

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

    static async removeData(key: string): Promise<void> {
        await AsyncStorage.removeItem(key);
    }

    static async initialiseApp(): Promise<boolean> {
        let isFetchingError: boolean = false;

        try {
            await this.getAllNames();
            await this.storeData("@app", JSON.stringify({ isInitialised: true }));
        } catch (e) {
            isFetchingError = true;
        }

        return isFetchingError;
    }

    static async getAllNames(): Promise<void[]> {
        const alphabets = getAlphabetsArray();
        return Promise.all(alphabets.map(alphabet => fetch(`${Urls.GetNameByAlphabet}${alphabet}`)))
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(names => Promise.all(names.map((name, index) => this.storeData(`@name/${alphabets[index]}`, JSON.stringify({ name })))));
    }
}
