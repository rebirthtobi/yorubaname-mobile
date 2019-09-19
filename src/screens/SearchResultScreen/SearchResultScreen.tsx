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

    async componentDidMount(): Promise<void> {
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
    private _searchName(): void {
        const { searchText } = this.state;
        const searchProps: SearchProps = getSearchStringProps(searchText);
        this.setState({ isSearching: true });

        if (!searchProps.isSearchable) {
            this.setState({
                isSearchable: false,
                isSearching:  false,
            });
        } else {
            this._processResult(searchProps.searchKey, searchText);
        }
    }

    @autobind
    private _processResult(searchKey: string, searchText: string): void {
        getSearchResult(searchKey, searchText).then(searchResult => {
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
        });
    }

    @autobind
    private _getItemKey(item: NameType, index: number): string {
        return `${item.id}${index}`;
    }

    @autobind
    private _getEmptyState(): ReactElement {
        return <EmptyState description={getTranslatedText("Your search does not match any names")}/>;
    }

    @autobind
    private _getItemSeparator(): ReactElement {
        return <View style={styles.itemSeparatorStyle}/>;
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
