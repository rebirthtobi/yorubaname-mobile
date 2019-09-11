import Urls from "../urls/urls";

export default class ApiManager {
    static fetchName(alphabet: string) {
        return fetch(`${Urls.GetNameByAlphabet}${alphabet}`);
    }

    static processNameResponse(responses: any[]) {
        return Promise.all(responses.map(response => response.json()));
    }
}
