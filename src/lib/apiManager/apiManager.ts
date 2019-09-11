import Urls from "../urls/urls";

export interface SuggestNameType {
    details: string;
    email: string;
    name: string;
}

export default class ApiManager {
    static fetchName(alphabet: string) {
        return fetch(`${Urls.GetNameByAlphabet}${alphabet}`);
    }

    static processNameResponse(responses: any[]) {
        return Promise.all(responses.map(response => response.json()));
    }

    static async submitSuggestedName({ details, email, name }: SuggestNameType) {
        return await fetch(Urls.SuggestName, {
            body: JSON.stringify({
                details,
                email,
                name,
            }),
            method: "POST",
        });
    }
}
