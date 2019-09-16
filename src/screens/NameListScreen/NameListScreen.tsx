import { autobind } from "core-decorators";
import { DataManagerType, ItemType, NameType } from "../../lib/dataManager/data";
import * as Sentry from "@sentry/react-native";
import {
    FlatList, StyleSheet, Text, View,
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Routes } from "../../navigation/constants";
import Colours from "../../lib/colours/colours";
import DataManager from "../../lib/dataManager/dataManager";
import EmptyState from "../../components/EmptyState/EmptyState";
import getTranslatedText from "../../lib/localization/getTranslatedText";
import Icon from "react-native-vector-icons/Feather";
import LoadingState from "../../components/LoadingState/LoadingState";
import React, { Component, ReactElement } from "react";
import withSafeAreaView from "../../components/withSafeAreaView/withSafeAreaView";

const styles = StyleSheet.create({
    headerContainer: {
        alignItems:        "center",
        backgroundColor:   Colours.PrimaryColour,
        flexDirection:     "row",
        height:            56,
        paddingHorizontal: 16,
        paddingVertical:   4,
    },
    headerIcon: { marginRight: "auto" },
    headerText: {
        color:      Colours.SecondaryColour,
        flex:       1,
        fontSize:   20,
        fontWeight: "bold",
        textAlign:  "center",
    },
    itemSeparatorStyle: {
        backgroundColor: Colours.PrimaryColour,
        height:          0.5,
    },
    listItemStyle: {
        color:             Colours.GreyColour,
        fontSize:          18,
        minHeight:         50,
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

interface NameListState {
    isLoading: boolean;
    data: NameType[];
}

class NameListScreen extends Component<NavigationScreenProps, NameListState> {
    state: NameListState = {
        data:      [],
        isLoading: true,
    };

    async componentDidMount(): Promise<void> {
        await this._getData();
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({ isLoading: false });
    }

    render() {
        const { isLoading, data } = this.state;

        if (isLoading) {
            return <LoadingState />;
        }

        return (
            <View>
                <View style={styles.headerContainer}>
                    <Icon
                        name={"arrow-left"}
                        color={Colours.SecondaryColour}
                        size={40}
                        style={styles.headerIcon}
                        onPress={this._goBack}
                    />
                    <Text style={styles.headerText}>
                        {`${this._getAlphabet()} - ${getTranslatedText("Names")}`}
                    </Text>
                </View>
                <FlatList
                    data={data}
                    ItemSeparatorComponent={this._getItemSeparator}
                    renderItem={this._getItemComponent}
                    keyExtractor={this._getItemKey}
                    ListEmptyComponent={this._getEmptyState}
                />
            </View>
        );
    }

    @autobind
    private _getAlphabet(): string {
        const { navigation } = this.props;
        return navigation.getParam("alphabet");
    }

    @autobind
    private async _getData(): Promise<void> {
        const alphabet = this._getAlphabet();

        if (!alphabet) {
            this.setState({
                data:      [],
                isLoading: false,
            });
        }

        try {
            const namesByAlphabet: DataManagerType = await DataManager.getData(`@name/${alphabet}`) as ItemType;
            this.setState({
                data:      this._extractNeededNameData(namesByAlphabet),
                isLoading: false,
            });
        } catch (e) {
            Sentry.configureScope(scope => {
                Sentry.captureMessage("getting name list from async storage failed");
                scope.setExtra("alphabet", alphabet);
                Sentry.captureException(e);
            });
            this.setState({
                data:      [],
                isLoading: false,
            });
        }
    }

    @autobind
    private _getItemKey(item: NameType, index: number): string {
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
    private _getItemComponent({ item }: {item: NameType}): ReactElement {
        return <Text style={styles.listItemStyle} onPress={() => this._handleItemClick(item)}> {item.name} </Text>;
    }

    @autobind
    private _goBack(): void {
        const { navigation } = this.props;
        navigation.goBack();
    }

    @autobind
    private _handleItemClick(item: NameType): void {
        const { navigation } = this.props;
        navigation.navigate(Routes.NameScreen, { item });
    }

    @autobind
    private _extractNeededNameData(names: ItemType): NameType[] {
        return names!.name.map((name: NameType) => ({
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
}

export default withSafeAreaView(NameListScreen);
