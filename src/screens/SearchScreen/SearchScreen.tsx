import { autobind } from "core-decorators";
import {
    Image, StatusBar, StyleSheet, View,
} from "react-native";
import Colours from "../../lib/colours/colours";
import Logo from "../../assets/image/yd-logo-beta.png";
import React, { Component } from "react";
import SearchField from "../../components/SearchField/SearchField";

const styles = StyleSheet.create({
    logoStyle: {
        alignSelf:    "center",
        height:       70,
        marginBottom: 16,
        marginTop:    56,
        resizeMode:   "center",
        width:        "70%",
    },
});

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
                <Image source={Logo} style={styles.logoStyle}/>
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
