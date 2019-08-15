import { autobind } from "core-decorators";
import {
    SectionList, SectionListData, SectionListRenderItem, StyleSheet, Text, View,
} from "react-native";
import Colours from "../../lib/colours/colours";
import data from "../../data";
import EmptyState from "../../components/EmptyState/EmptyState";
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

interface ItemType {
    id: number;
    name: string;
}

class NameListScreen extends Component {
    render() {
        return (
            <SectionList
                ItemSeparatorComponent={this._getItemSeparator}
                sections={this._getSectionedData()}
                renderSectionHeader={this._getSectionHeader}
                renderItem={this._getItemComponent}
                keyExtractor={this._getItemKey}
                ListEmptyComponent={this._getEmptyState}
                stickySectionHeadersEnabled
                contentContainerStyle={styles.sectionContainerStyle}
            />
        );
    }

    @autobind
    private _getItemKey(item: ItemType, index: number): string {
        return `${item.id}${index}`;
    }

    @autobind
    private _getEmptyState(): ReactElement {
        return <EmptyState description={"There are no names submitted yet"}/>;
    }

    @autobind
    private _getItemSeparator(): ReactElement {
        return <View style={styles.itemSeparatorStyle}/>;
    }

    @autobind
    private _getSectionHeader({ section }: { section: SectionListData<any>}): ReactElement {
        return (
            <View>
                <Text style={styles.sectionHeaderStyle}>
                    {section.section}
                </Text>
            </View>
        );
    }

    @autobind
    private _getItemComponent({ item }: {item: SectionListRenderItem<any>}): ReactElement {
        return <Text style={styles.listItemStyle}> {item.name} </Text>;
    }

    @autobind
    private _getSectionedData(): Array<SectionListData<any>> {
        return [];
    }
}

export default NameListScreen;
