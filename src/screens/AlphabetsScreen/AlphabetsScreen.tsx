import { AlphabetProps, getAlphabetWithProps } from "../../lib/alphabet/alphabet";
import { appearance, fontFamily } from "../../lib/styles/styles";
import { AppInfoType, DataManagerType } from "../../lib/dataManager/data";
import { autobind } from "core-decorators";
import {
    FlatList, StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Routes } from "../../navigation/constants";
import Colours from "../../lib/colours/colours";
import DataManager from "../../lib/dataManager/dataManager";
import getTranslatedText from "../../lib/localization/getTranslatedText";
import React, { Component, ReactElement } from "react";
import Toast from "react-native-root-toast";
import withSafeAreaView from "../../components/withSafeAreaView/withSafeAreaView";

const styles = StyleSheet.create({
    alphabetText: {
        color:             Colours.GreyColour,
        fontFamily,
        fontSize:          50,
        paddingHorizontal: 12,
        textAlign:         "center",
    },
    alphabetWrapper: {
        backgroundColor:  Colours.SecondaryColour,
        borderRadius:     2,
        flexDirection:    "row",
        marginHorizontal: 16,
        marginVertical:   8,
        ...appearance.shadow,
    },
    exampleContainer: { justifyContent: "space-between" },
    exampleTitle:     {
        color:      Colours.GreyColour,
        fontFamily,
        fontSize:   12,
        fontWeight: "bold",
    },
    firstTag: {
        margin:         0,
        marginRight:    4,
        marginVertical: 4,
    },
    tag: {
        backgroundColor: Colours.PrimaryColour,
        borderRadius:    5,
        color:           Colours.SecondaryColour,
        fontFamily,
        margin:          4,
        padding:         4,
    },
    tagWrapper: {
        alignItems:    "flex-end",
        flexDirection: "row",
    },
});

const alphabetsArray: AlphabetProps[] = getAlphabetWithProps();

class AlphabetsScreen extends Component<NavigationScreenProps> {
    render() {
        return (
            <View>
                <FlatList<AlphabetProps>
                    data={alphabetsArray}
                    renderItem={this._getItemComponent}
                    keyExtractor={this._getItemKey}
                />
            </View>
        );
    }

    @autobind
    private _getItemComponent({ item }: { item: AlphabetProps }): ReactElement {
        return (
            // tslint:disable-next-line:jsx-no-lambda
            <TouchableOpacity onPress={() => this._handleOnItemPress(item)} activeOpacity={0.7}>
                <View style={styles.alphabetWrapper}>
                    <Text style={styles.alphabetText}> {item.alphabet} </Text>
                    <View style={styles.exampleContainer}>
                        <Text style={styles.exampleTitle}>As in;</Text>
                        <View style={styles.tagWrapper}>
                            {/* tslint:disable-next-line:jsx-no-multiline-js */}
                            {item.examples.map((example: string, index: number) => (
                                // eslint-disable-next-line no-magic-numbers
                                <Text key={index} style={[styles.tag, (index === 0) && styles.firstTag]}>
                                    {example}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    @autobind
    private _getItemKey(item: AlphabetProps, index: number): string {
        return `${item.alphabet}${index}`;
    }

    @autobind
    private _handleOnItemPress(item: AlphabetProps) {
        if (this._isAppInitialised()) {
            const { navigation } = this.props;
            navigation.navigate(Routes.NameList, { alphabet: item.alphabet });
        } else {
            Toast.show(getTranslatedText("Names database is not initialized, Update this in settings menu"), {
                animation:   true,
                duration:    Toast.durations.LONG,
                hideOnPress: false,
                position:    Toast.positions.BOTTOM,
                shadow:      true,
            });
        }
    }

    @autobind
    private async _isAppInitialised(): Promise<boolean> {
        const appInfo: DataManagerType = await DataManager.getData("@app") as AppInfoType;
        return appInfo && appInfo.isInitialised;
    }
}

export default withSafeAreaView(AlphabetsScreen);
