const alphabet = "abdefghijklmnoprstuwy";

export interface AlphabetProps {
    alphabet: string;
    examples: string[];
}

export function getAlphabetsArray(): string[] {
    const alphabetArray = alphabet.split("");
    alphabetArray.splice(4, 0, "ẹ");
    alphabetArray.splice(7, 0, "gb");
    alphabetArray.splice(16, 0, "ọ");
    alphabetArray.splice(20, 0, "ṣ");

    return alphabetArray;
}

export function getAlphabetWithProps(): AlphabetProps[] {
    return [
        {
            alphabet: "a",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "b",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "d",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "e",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "ẹ",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "f",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "g",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "gb",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "h",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "i",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "j",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "k",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "l",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "m",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "n",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "o",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "ọ",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "p",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "r",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "s",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "ṣ",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "t",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "u",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "w",
            examples: ["ade", "ade"],
        },
        {
            alphabet: "y",
            examples: ["ade", "ade"],
        },
    ];
}
