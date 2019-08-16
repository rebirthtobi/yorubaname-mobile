import { LanguageTypes, ObjectIndex } from "./localizationTypes";
import englishStrings from "./en";

const languages: LanguageTypes = {
    en: {
        code:        "en",
        name:        "English",
        translation: englishStrings,
    },
};
const selectedLanguage = "en";

const variableRegex = /{\w+}/g;
const bracketRegex = /[{}]/g;

function hasPlaceholder(untranslatedText: string): boolean {
    return !!untranslatedText && !!untranslatedText.match(variableRegex);
}

function hasValueReplacements(valueReplacements?: ObjectIndex): boolean {
    return !!valueReplacements && !!Object.keys(valueReplacements).length;
}

function getPlaceHolders(untranslatedText: string): string[] {
    if (!hasPlaceholder(untranslatedText)) {
        return [];
    }

    const placeholders = untranslatedText.match(variableRegex);
    return !placeholders ? [] : placeholders;
}

export default function getTranslatedText(untranslatedText: string, valueReplacements?: ObjectIndex): string {
    const emptyString: string = "";
    if (!untranslatedText) {
        return emptyString;
    }

    const isPlaceholderPresent: boolean = hasPlaceholder(untranslatedText);
    const isValueReplacementsPresent: boolean = hasValueReplacements(valueReplacements);
    const variablePlaceholders: string[] = getPlaceHolders(untranslatedText);
    let translatedText: string = languages[selectedLanguage].translation[untranslatedText];

    if ((isPlaceholderPresent && !isValueReplacementsPresent) || !translatedText) {
        return emptyString;
    }

    if (!isPlaceholderPresent) {
        return translatedText;
    }

    let isAllValuesAvailable = false;

    for (let variable of variablePlaceholders) {
        variable = variable.replace(bracketRegex, "");

        // @ts-ignore
        if (!valueReplacements[variable]) {
            isAllValuesAvailable = true;
            continue;
        }
        // @ts-ignore
        translatedText = translatedText.replace(`{${variable}}`, valueReplacements[variable]);
    }
    return isAllValuesAvailable ? emptyString : translatedText;
}
