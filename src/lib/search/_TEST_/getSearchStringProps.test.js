import { getSearchStringProps } from "../search";

describe("Testing the getSearchProps function", () => {
    it("should pass all edge cases", () => {
        expect(getSearchStringProps(null)).toEqual({
            isSearchable: false,
            searchKey:    "",
        });
        expect(getSearchStringProps(undefined)).toEqual({
            isSearchable: false,
            searchKey:    "",
        });
        expect(getSearchStringProps(0)).toEqual({
            isSearchable: false,
            searchKey:    "",
        });
        expect(getSearchStringProps(5)).toEqual({
            isSearchable: false,
            searchKey:    "",
        });
        expect(getSearchStringProps([3, 5])).toEqual({
            isSearchable: false,
            searchKey:    "",
        });
        expect(getSearchStringProps({
            isSearchable: false,
            searchKey:    "",
        })).toEqual({
            isSearchable: false,
            searchKey:    "",
        });
        expect(getSearchStringProps("")).toEqual({
            isSearchable: false,
            searchKey:    "",
        });
    });

    it("should behave as expected with string only", () => {
        expect(getSearchStringProps("Ade")).toEqual({
            isSearchable: true,
            searchKey:    "a",
        });
        expect(getSearchStringProps("Zainab")).toEqual({
            isSearchable: false,
            searchKey:    "",
        });
        expect(getSearchStringProps("Gbolahan")).toEqual({
            isSearchable: true,
            searchKey:    "gb",
        });
        expect(getSearchStringProps("ẹgbon")).toEqual({
            isSearchable: true,
            searchKey:    "ẹ",
        });
        expect(getSearchStringProps("ọlori")).toEqual({
            isSearchable: true,
            searchKey:    "ọ",
        });
        expect(getSearchStringProps("ṣeye")).toEqual({
            isSearchable: true,
            searchKey:    "ṣ",
        });
    });
});
