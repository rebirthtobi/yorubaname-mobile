import { autobind } from "core-decorators";
import { NavigationScreenProps } from "react-navigation";
import { Routes } from "../../navigation/constants";
import { StatusBar, StyleSheet, View } from "react-native";
import Brand from "../../components/Brand/Brand";
import Colours from "../../lib/colours/colours";
import React, { Component } from "react";
import SearchField from "../../components/SearchField/SearchField";
import SubmitNameButton from "../../components/SubmitNameButton/SubmitNameButton";

const styles = StyleSheet.create({ container: { flex: 1 } });

interface SearchState {
    searchText: string;
}

class SearchScreen extends Component<NavigationScreenProps, SearchState> {
    constructor(props: NavigationScreenProps) {
        super(props);

        this.state = { searchText: "" };
    }
    render() {
        const { searchText } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={Colours.PrimaryColour}
                    barStyle={"light-content"}
                />
                <Brand />
                <SearchField
                    searchText={searchText}
                    onChangeText={this._handleTextChange}
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
    private _navigateToSubmitNameScreen(): void {
        const { navigation } = this.props;
        navigation.navigate(Routes.SubmitName);
    }
}

export default SearchScreen;
