import * as Sentry from "@sentry/react-native";
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
        Sentry.addBreadcrumb({
            category: "get_data",
            data:     { key },
            level:    Sentry.Severity.Info,
            message:  "Getting of data from the async storage",
        });

        try {
            const data = await AsyncStorage.getItem(key);
            Sentry.captureMessage("data retrieved successfully", Sentry.Severity.Info);
            if (data) {
                Sentry.captureMessage("data retrieved is a valid data", Sentry.Severity.Info);
                return JSON.parse(data);
            } else {
                Sentry.captureMessage("data retrieved is invalid", Sentry.Severity.Info);
                return null;
            }
        } catch (e) {
            Sentry.captureMessage("getting of data failed", Sentry.Severity.Info);
            Sentry.captureException(e);
            return null;
        }
    }

    static async removeMultipleData(key: string[]): Promise<void> {
        Sentry.addBreadcrumb({
            category: "remove_multiple_data",
            data:     { key },
            level:    Sentry.Severity.Info,
            message:  "Getting of data from the async storage",
        });
        await AsyncStorage.multiRemove(key);
        Sentry.captureMessage("removal of data done", Sentry.Severity.Info);
    }

    static async initialiseApp(): Promise<boolean> {
        Sentry.addBreadcrumb({
            category: "get_name",
            level:    Sentry.Severity.Info,
            message:  "Initialization of app - downloading of name database for the first time",
        });
        let isFetchingError: boolean = false;

        try {
            Sentry.captureMessage("start api getting of names", Sentry.Severity.Info);
            const names: NameType[] = await DataManager.getAllNames();
            Sentry.captureMessage("Getting of name from api done", Sentry.Severity.Info);
            Sentry.captureMessage("Storing of names in data store started", Sentry.Severity.Info);
            await DataManager.storeAllNames(names);
            Sentry.captureMessage("Storing of names in data store done", Sentry.Severity.Info);
            Sentry.captureMessage("Storing the initialization of app flag in storage started", Sentry.Severity.Info);
            await DataManager.storeData("@app", JSON.stringify({ isInitialised: true }));
            Sentry.captureMessage("Storing the initialization of app flag in storage done", Sentry.Severity.Info);
            isFetchingError = true;
        } catch (e) {
            Sentry.captureMessage("Initialization of app failed", Sentry.Severity.Fatal);
            Sentry.captureException(e);
            isFetchingError = false;
        }

        return isFetchingError;
    }

    static async getAllNames(): Promise<any[]> {
        const alphabets = getAlphabetsArray();
        Sentry.addBreadcrumb({
            category: "get_api_name_data",
            data:     { alphabets },
            level:    Sentry.Severity.Info,
            message:  "Getting of names from api",
        });
        Sentry.captureMessage("Getting names from the api started", Sentry.Severity.Info);
        return Promise.all(alphabets.map(alphabet => ApiManager.fetchName(alphabet)))
            .then(responses => ApiManager.processNameResponse(responses));
    }

    static async storeAllNames(names: NameType[]): Promise<void[]> {
        const alphabets = getAlphabetsArray();
        Sentry.addBreadcrumb({
            category: "string_name_data",
            data:     { alphabets, names },
            level:    Sentry.Severity.Info,
            message:  "Storing of names inside async storage",
        });
        Sentry.captureMessage("Storing of name inside async storage stated", Sentry.Severity.Info);
        return Promise.all(
            names.map((name, index) => DataManager.storeData(`@name/${alphabets[index]}`,
                JSON.stringify({ name })))
        );
    }

    static async refreshNamesDb(): Promise<boolean> {
        Sentry.addBreadcrumb({
            category: "get_name",
            level:    Sentry.Severity.Info,
            message:  "updating of app - downloading of name database for the first time",
        });
        let isFetchingError: boolean = false;

        try {
            Sentry.captureMessage("resetting app initialization state", Sentry.Severity.Info);
            await DataManager.storeData("@app", JSON.stringify({ isInitialised: false }));
            Sentry.captureMessage("start api getting of names", Sentry.Severity.Info);
            const names: NameType[] = await DataManager.getAllNames();
            Sentry.captureMessage("Getting of name from api done", Sentry.Severity.Info);
            const namesKeys = getAlphabetsArray().map(alphabet => `@name/${alphabet}`);
            Sentry.captureMessage("Removing already stored names", Sentry.Severity.Info);
            await DataManager.removeMultipleData(namesKeys);
            Sentry.captureMessage("Storing of names in data store started", Sentry.Severity.Info);
            await DataManager.storeAllNames(names);
            Sentry.captureMessage("Storing of names in data store done", Sentry.Severity.Info);
            Sentry.captureMessage("Storing the initialization of app flag in storage started", Sentry.Severity.Info);
            await DataManager.storeData("@app", JSON.stringify({ isInitialised: true }));
            Sentry.captureMessage("marking initialization done", Sentry.Severity.Info);
            isFetchingError = true;
        } catch (e) {
            Sentry.captureMessage("Updating of name database failed", Sentry.Severity.Fatal);
            Sentry.captureException(e);
            isFetchingError = false;
        }

        return isFetchingError;
    }
}
