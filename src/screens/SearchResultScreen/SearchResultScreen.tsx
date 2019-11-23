import { autobind } from "core-decorators";
import {
    FlatList, StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import { getSearchResult, getSearchStringProps, SearchProps } from "../../lib/search/search";
import { NameType } from "../../lib/dataManager/data";
import { NavigationScreenProps } from "react-navigation";
import { Routes } from "../../navigation/constants";
import Colours from "../../lib/colours/colours";
import EmptyState from "../../components/EmptyState/EmptyState";
import getTranslatedText from "../../lib/localization/getTranslatedText";
import LoadingState from "../../components/LoadingState/LoadingState";
import React, { Component, ReactElement } from "react";
import SearchField from "../../components/SearchField/SearchField";
import withSafeAreaView from "../../components/withSafeAreaView/withSafeAreaView";

const styles = StyleSheet.create({
    errorContainer:     { alignItems: "center" },
    errorPressableText: { color: Colours.PrimaryColour },
    errorText:          { fontSize: 20 },
    itemSeparatorStyle: {
        backgroundColor: Colours.PrimaryColour,
        height:          0.5,
    },
    listItemContainer: {
        flex:              1,
        paddingHorizontal: 16,
        paddingVertical:   8,
    },
    listItemMeaning: {
        color:    Colours.BlackColour,
        fontSize: 16,
    },
    listItemName: {
        color:    Colours.GreyColour,
        fontSize: 20,
    },
});

interface SearchResultState {
    searchText: string;
    isSearchable: boolean;
    isSearching: boolean;
    searchResult: NameType[];
}

class SearchResultScreen extends Component<NavigationScreenProps, SearchResultState> {
    constructor(props: NavigationScreenProps) {
        super(props);

        const { navigation } = this.props;
        this.state = {
            isSearchable: navigation.getParam("isSearchable"),
            isSearching:  true,
            searchResult: [],
            searchText:   navigation.getParam("searchText"),
        };
    }

    async componentDidMount() {
        await this._searchName();
    }

    render() {
        const {
            isSearchable, isSearching, searchResult, searchText,
        } = this.state;
        return (
            <View>
                <SearchField
                    searchText={searchText}
                    onChangeText={this._handleTextChange}
                    onPress={this._searchName}
                    name="search"
                    isMaterialDesign
                />
                {isSearching && <LoadingState />}
                {!isSearching && !isSearchable && <EmptyState description={"Your search does not match any names"}/>}
                {!isSearching && isSearchable && this._renderSearchResults(searchResult)}
            </View>
        );
    }

    @autobind
    private _handleTextChange(searchText: string): void {
        this.setState({ searchText });
    }

    @autobind
    private async _searchName() {
        const { searchText } = this.state;
        const searchProps: SearchProps = getSearchStringProps(searchText);
        this.setState({ isSearching: true });

        if (!searchProps.isSearchable) {
            this.setState({
                isSearchable: false,
                isSearching:  false,
            });
        } else {
            await this._processResult(searchProps.searchKey, searchText);
        }
    }

    @autobind
    private async _processResult(searchKey: string, searchText: string) {
        const searchResult = await getSearchResult(searchKey, searchText);
        this.setState({
            isSearchable: true,
            isSearching:  false,
            searchResult,
        });
        // eslint-disable-next-line no-magic-numbers
        if (searchResult.length === 1) {
            const [name] = searchResult;
            this._viewName(name);
        }
    }

    @autobind
    private _getItemKey(item: NameType, index: number): string {
        return `${item.id}${index}`;
    }

    @autobind
    private _getEmptyState(): ReactElement {
        const emptyComponent = (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Your Search did not match any name</Text>
                <Text
                    onPress={this._suggestSearchedName}
                    style={[styles.errorText, styles.errorPressableText]}
                >
                    Click here to request for this name
                </Text>
            </View>
        );

        return (
            <EmptyState
                description={getTranslatedText("Your search does not match any names")}
                emptyComponent={emptyComponent}
            />
        );
    }

    @autobind
    private _getItemSeparator(): ReactElement {
        return <View style={styles.itemSeparatorStyle}/>;
    }

    @autobind
    private _suggestSearchedName(): void {
        const { navigation } = this.props;
        const { searchText } = this.state;

        navigation.navigate(Routes.SubmitName, { name: searchText });
    }

    @autobind
    /* tslint:disable:jsx-no-lambda */
    private _getItemComponent({ item }: {item: NameType}): ReactElement {
        return (
            <TouchableOpacity
                onPress={() => this._viewName(item)}
                activeOpacity={1}
            >
                <View style={styles.listItemContainer}>
                    <Text style={styles.listItemName}> {item.name} </Text>
                    <Text style={styles.listItemMeaning}> {item.meaning} </Text>
                </View>
            </TouchableOpacity>
        );
    }

    @autobind
    private _viewName(item: NameType): void {
        const { navigation } = this.props;
        navigation.navigate(Routes.NameScreen, { item });
    }

    @autobind
    private _renderSearchResults(searchResult: NameType[]): ReactElement {
        return (
            <FlatList
                data={searchResult}
                ItemSeparatorComponent={this._getItemSeparator}
                renderItem={this._getItemComponent}
                keyExtractor={this._getItemKey}
                ListEmptyComponent={this._getEmptyState}
            />
        );
    }
}

export default withSafeAreaView(SearchResultScreen);
