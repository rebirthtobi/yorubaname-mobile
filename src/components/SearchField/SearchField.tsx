import { fontFamily } from "../../lib/styles/styles";
import { StyleSheet, TextInput } from "react-native";
import Colours from "../../lib/colours/colours";
import React, { ReactElement } from "react";
import withIcon from "../withIcon/withIcon";

const styles = StyleSheet.create({
    searchField: {
        borderColor:       Colours.PrimaryColour,
        borderRadius:      3,
        borderWidth:       1,
        fontFamily,
        fontSize:          18,
        height:            26,
        paddingHorizontal: 16,
    },
});

interface SearchFieldProps {
    injectedStyles?: object;
    searchText: string;
    onChangeText(text: string): void;
    onPress(): void;
}

const SearchField = ({
    searchText, onChangeText, injectedStyles, onPress,
}: SearchFieldProps): ReactElement => (
    <TextInput
        value={searchText}
        style={[styles.searchField, injectedStyles]}
        onChangeText={onChangeText}
        returnKeyType="search"
        enablesReturnKeyAutomatically
        onSubmitEditing={onPress}
    />
);

export default withIcon(SearchField);
