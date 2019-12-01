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
            examples: ["Alátiṣe", "Akínfọlájù"],
        },
        {
            alphabet: "b",
            examples: ["Babátọ́lá", "Bándélé"],
        },
        {
            alphabet: "d",
            examples: ["Dásọfúnjó", "Déṣíkù"],
        },
        {
            alphabet: "e",
            examples: ["Efunche", "Ejiyọóyè"],
        },
        {
            alphabet: "ẹ",
            examples: ["Ẹ̀ríìfẹ́olúwa", "Ẹ̀rùòbodò"],
        },
        {
            alphabet: "f",
            examples: ["Fámúyìdé", "Fásẹwà"],
        },
        {
            alphabet: "g",
            examples: ["Gẹ́gẹ́lẹ̀ṣọ́", "Gígalolúwa"],
        },
        {
            alphabet: "gb",
            examples: ["Gbélékalẹ̀", "Gbénlé"],
        },
        {
            alphabet: "h",
            examples: ["Hárúnà"],
        },
        {
            alphabet: "i",
            examples: ["Ìgbẹ́kọ̀yí", "Ifáwuyi"],
        },
        {
            alphabet: "j",
            examples: ["Jẹ́miníwà", "Jésùtósin"],
        },
        {
            alphabet: "k",
            examples: ["Kẹ́yìndé", "Kòkúmọ́"],
        },
        {
            alphabet: "l",
            examples: ["Lárìnàká", "Làtífù"],
        },
        {
            alphabet: "m",
            examples: ["Mofolúṣọ́", "Mọ́láwá"],
        },
        {
            alphabet: "n",
            examples: ["Nínálowó", "Níyọ̀ọlá"],
        },
        {
            alphabet: "o",
            examples: ["Oyèlẹ́yẹ", "Olúbánkẹ́"],
        },
        {
            alphabet: "ọ",
            examples: ["Ọdérìndé", "Ọmọ́kórè"],
        },
        {
            alphabet: "p",
            examples: ["Pèmísíre", "Pétérù"],
        },
        {
            alphabet: "r",
            examples: ["Rìnmáyọ̀", "Rọ́láyọ̀"],
        },
        {
            alphabet: "s",
            examples: ["Shórúngbé", "Sinmilólúwa"],
        },
        {
            alphabet: "ṣ",
            examples: ["Ṣhódípẹ̀", "Ṣọ́balójú"],
        },
        {
            alphabet: "t",
            examples: ["Tòkèdé", "Tolúwalògo"],
        },
        {
            alphabet: "u",
            examples: ["Ugbódín"],
        },
        {
            alphabet: "w",
            examples: ["Wáwòyí", "Wòmílójú"],
        },
        {
            alphabet: "y",
            examples: ["Yèyélúfẹ̀", "Yíwọlá"],
        },
    ];
}
