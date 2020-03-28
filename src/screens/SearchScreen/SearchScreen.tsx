import { autobind } from "core-decorators";
import { getSearchStringProps } from "../../lib/search/search";
import { NavigationScreenProps } from "react-navigation";
import {
    Platform, StatusBar, StyleSheet, View,
} from "react-native";
import { Routes } from "../../navigation/constants";
import Brand from "../../components/Brand/Brand";
import Colours from "../../lib/colours/colours";
import React, { Component } from "react";
import SearchField from "../../components/SearchField/SearchField";
import SubmitNameButton from "../../components/SubmitNameButton/SubmitNameButton";
import withSafeAreaView from "../../components/withSafeAreaView/withSafeAreaView";

const styles = StyleSheet.create({ container: { flex: 1 } });

interface SearchState {
    searchText: string;
}

class SearchScreen extends Component<NavigationScreenProps, SearchState> {
    state: SearchState = { searchText: "" };

    render() {
        const { searchText } = this.state;

        return (
            <View style={styles.container}>
                {this._getStatusBar()}
                <Brand />
                <SearchField
                    searchText={searchText}
                    onChangeText={this._handleTextChange}
                    onPress={this._searchName}
                    name="search"
                />
                <SubmitNameButton onClick={this._navigateToSubmitNameScreen}/>
            </View>
        );
    }

    @autobind
    private _handleTextChange(searchText: string): void {
        this.setState({ searchText });
    }

    @autobind
    private _getStatusBar(): React.ReactElement {
        return Platform.select({
            android: (
                <StatusBar
                    backgroundColor={Colours.PrimaryColour}
                    barStyle={"light-content"}
                />
            ),
            ios: (
                <StatusBar
                    backgroundColor={Colours.PrimaryColour}
                    barStyle={"dark-content"}
                />
            ),
        });
    }

    @autobind
    private _navigateToSubmitNameScreen(): void {
        const { navigation } = this.props;
        navigation.navigate(Routes.SubmitName);
    }

    @autobind
    private _searchName(): void {
        const { searchText } = this.state;
        const { navigation } = this.props;

        if (searchText && searchText.trim()) {
            const searchProps = getSearchStringProps(searchText.trim());
            navigation.navigate(Routes.SearchResult, {
                isSearchable: searchProps.isSearchable,
                searchKey:    searchProps.searchKey,
                searchText:   searchText.trim(),
            });
        }
    }
}

export default withSafeAreaView(SearchScreen);
