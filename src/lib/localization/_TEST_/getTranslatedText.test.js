import getTranslatedText from "../getTranslatedText";

describe("Testing getting of localized text", () => {
    it("should pass edge cases", () => {
        expect(getTranslatedText(null)).toBe("");
        expect(getTranslatedText(undefined)).toBe("");
        expect(getTranslatedText()).toBe("");
        expect(getTranslatedText(null, { cow: "cow" })).toBe("");
    });

    it("should return translated strings without variables as it", () => {
        expect(getTranslatedText("welcome")).toBe("welcome");
        expect(getTranslatedText("welcome", null)).toBe("welcome");
        expect(getTranslatedText("welcome", undefined)).toBe("welcome");
        expect(getTranslatedText("welcome", {})).toBe("welcome");
        expect(getTranslatedText("welcome", "")).toBe("welcome");
        expect(getTranslatedText("welcome", { cow: "cow" })).toBe("welcome");
    });

    it.skip("should return translated strings with variables as it", () => {
        expect(getTranslatedText("Not available in localizes strings")).toBe("");
        expect(getTranslatedText("There are no {names} submitted yet")).toBe("");
        expect(getTranslatedText("There are no {names} submitted yet", null)).toBe("");
        expect(getTranslatedText("There are no {names} submitted yet", undefined)).toBe("");
        expect(getTranslatedText("There are no {names} submitted yet", {})).toBe("");
        expect(getTranslatedText("There are no {names} submitted yet", "")).toBe("");
        expect(getTranslatedText(
            "There are no {names} submitted yet",
            { cow: "cow", names: "Tobi" }),
        ).toBe("There are no Tobi submitted yet");
        expect(getTranslatedText("There are no {names} submitted yet", { cow: "cow" })).toBe("");
        expect(getTranslatedText(
            "There are no {} submitted yet",
            { cow: "cow" }),
        ).toBe("There are no {} submitted yet");
    });
});
