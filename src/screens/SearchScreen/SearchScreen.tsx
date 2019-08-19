import { autobind } from "core-decorators";
import { StatusBar, View } from "react-native";
import Brand from "../../components/Brand/Brand";
import Colours from "../../lib/colours/colours";
import React, { Component } from "react";
import SearchField from "../../components/SearchField/SearchField";

interface SearchState {
    searchText: string;
}

class SearchScreen extends Component<{}, SearchState> {
    constructor(props: {}) {
        super(props);

        this.state = { searchText: "" };
    }
    render() {
        const { searchText } = this.state;

        return (
            <View>
                <StatusBar
                    backgroundColor={Colours.PrimaryColour}
                    barStyle={"light-content"}
                />
                <Brand />
                <SearchField
                    searchText={searchText}
                    onChangeText={this._handleTextChange}
                />
            </View>
        );
    }

    @autobind
    private _handleTextChange(searchText: string): void {
        this.setState({ searchText });
    }
}

export default SearchScreen;
