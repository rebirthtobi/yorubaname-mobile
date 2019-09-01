import { autobind } from "core-decorators";
import {
    FlatList, StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import { getAlphabetsArray } from "../../lib/dataManager/dataManager";
import { NavigationScreenProps } from "react-navigation";
import { Routes } from "../../navigation/constants";
import Colours from "../../lib/colours/colours";
import React, { Component, ReactElement } from "react";

const styles = StyleSheet.create({
    alphabetText: {
        color:    Colours.GreyColour,
        fontSize: 40,
    },
    alphabetWrapper: {
        alignItems:       "center",
        borderColor:      Colours.PrimaryColour,
        borderRightWidth: 1,
        justifyContent:   "center",
        minHeight:        100,
        width:            "50%",
    },
    itemSeparatorStyle: {
        backgroundColor: Colours.PrimaryColour,
        height:          1,
    },
});

const alphabetsArray = getAlphabetsArray();

export default class AlphabetsScreen extends Component<NavigationScreenProps> {
    render() {
        return (
            <View>
                <FlatList
                    data={alphabetsArray}
                    renderItem={this._getItemComponent}
                    numColumns={2}
                    keyExtractor={this._getItemKey}
                    ItemSeparatorComponent={this._getItemSeparator}
                />
            </View>
        );
    }

    @autobind
    private _getItemComponent({ item }: { item: string }): ReactElement {
        return (
            <TouchableOpacity onPress={() => this._handleOnItemPress(item)} style={styles.alphabetWrapper}>
                <View>
                    <Text style={styles.alphabetText}> {item} </Text>
                </View>
            </TouchableOpacity>
        );
    }

    @autobind
    private _getItemKey(item: string, index: number): string {
        return `${item}${index}`;
    }

    @autobind
    private _getItemSeparator(): ReactElement {
        return <View style={styles.itemSeparatorStyle}/>;
    }

    @autobind
    private _handleOnItemPress(item: string) {
        const { navigation } = this.props;
        navigation.navigate(Routes.NameList, { alphabet: item });
    }
}
