import { StyleSheet, TextInput } from "react-native";
import Colours from "../../lib/colours/colours";
import React, { ReactElement } from "react";
import withIcon from "../withIcon/withIcon";

const styles = StyleSheet.create({
    searchField: {
        borderColor:       Colours.PrimaryColour,
        borderRadius:      9,
        borderWidth:       1,
        fontSize:          18,
        paddingHorizontal: 16,
    },
});

interface SearchFieldProps {
    injectedStyles?: object;
    searchText: string;
    onChangeText(text: string): void;
}

const SearchField = ({ searchText, onChangeText, injectedStyles }: SearchFieldProps): ReactElement => (
    <TextInput
        value={searchText}
        style={[styles.searchField, injectedStyles]}
        onChangeText={onChangeText}
    />
);

export default withIcon(SearchField);
