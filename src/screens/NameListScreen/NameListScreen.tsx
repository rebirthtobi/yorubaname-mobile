import { autobind } from "core-decorators";
import {
    FlatList, StyleSheet, Text, View,
} from "react-native";
import { ItemType } from "../../lib/dataManager/data";
import { NavigationScreenProps } from "react-navigation";
import Colours from "../../lib/colours/colours";
import DataManager from "../../lib/dataManager/dataManager";
import EmptyState from "../../components/EmptyState/EmptyState";
import getTranslatedText from "../../lib/localization/getTranslatedText";
import React, { Component, ReactElement } from "react";

const styles = StyleSheet.create({
    itemSeparatorStyle: {
        backgroundColor: Colours.PrimaryColour,
        height:          0.5,
    },
    listItemStyle: {
        color:             Colours.PrimaryColour,
        fontSize:          18,
        paddingHorizontal: 16,
        paddingVertical:   8,
    },
    sectionContainerStyle: { height: "100%" },
    sectionHeaderStyle:    {
        backgroundColor:   Colours.MutedColour,
        color:             Colours.PrimaryColour,
        fontSize:          24,
        paddingHorizontal: 8,
    },
});

class NameListScreen extends Component<NavigationScreenProps> {
    render() {
        return (
            <FlatList
                data={this._getData()}
                ItemSeparatorComponent={this._getItemSeparator}
                renderItem={this._getItemComponent}
                keyExtractor={this._getItemKey}
                ListEmptyComponent={this._getEmptyState}
            />
        );
    }

    public async _getData(): Promise<ItemType[]> {
        const { navigation } = this.props;
        const alphabet = navigation.getParam("alphabet");

        if (!alphabet) {
            return [];
        }

        const namesByAlphabet: ItemType | null = await DataManager.getData(`@name/${alphabet}`);

        if (!namesByAlphabet) {
            return [];
        }

        return namesByAlphabet.map((name: ItemType) => ({
            etymology:       name.etymology,
            extendedMeaning: name.extendedMeaning,
            famousPeople:    name.famousPeople,
            geoLocation:     name.geoLocation,
            id:              name.id,
            meaning:         name.meaning,
            media:           name.media,
            morphology:      name.morphology,
            name:            name.name,
            variants:        name.variants,
        }));
    }

    @autobind
    private _getItemKey(item: ItemType, index: number): string {
        return `${item.id}${index}`;
    }

    @autobind
    private _getEmptyState(): ReactElement {
        return <EmptyState description={getTranslatedText("There are no names submitted yet")}/>;
    }

    @autobind
    private _getItemSeparator(): ReactElement {
        return <View style={styles.itemSeparatorStyle}/>;
    }

    @autobind
    private _getItemComponent({ item }: {item: ItemType}): ReactElement {
        return <Text style={styles.listItemStyle}> {item.name} </Text>;
    }
}

export default NameListScreen;
