import { AppInfoType, DataManagerType } from "../../lib/dataManager/data";
import { autobind } from "core-decorators";
import {
    FlatList, StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Routes } from "../../navigation/constants";
import Colours from "../../lib/colours/colours";
import DataManager, { getAlphabetsArray } from "../../lib/dataManager/dataManager";
import getTranslatedText from "../../lib/localization/getTranslatedText";
import React, { Component, ReactElement } from "react";
import Toast from "react-native-root-toast";
import withSafeAreaView from "../../components/withSafeAreaView/withSafeAreaView";

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

class AlphabetsScreen extends Component<NavigationScreenProps> {
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
            // tslint:disable-next-line:jsx-no-lambda
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
        if (this._isAppInitialised()) {
            const { navigation } = this.props;
            navigation.navigate(Routes.NameList, { alphabet: item });
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
