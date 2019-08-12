import { StyleSheet, TextInput } from "react-native";
import Colours from "../../lib/colours/colours";
import Positions from "../../lib/withIconPositions/withIconPositions";
import React from "react";
import withIcon from "../withIcon/withIcon";

const styles = StyleSheet.create({
    searchField: {
        borderColor:       Colours.PrimaryColour,
        borderRadius:      9,
        borderWidth:       1,
        fontSize:          16,
        paddingHorizontal: 16,
    },
});

interface SearchFieldProps {
    injectedStyles?: object;
    searchText: string;
    onChangeText(text: string): void;
}

const SearchField = ({ searchText, onChangeText, injectedStyles }: SearchFieldProps) => (
    <TextInput
        value={searchText}
        style={{ ...styles.searchField, ...injectedStyles }}
        onChangeText={onChangeText}
    />
);

const iconProps = {
    name:     "search",
    position: Positions.Right,
};

export default withIcon(SearchField, iconProps);
