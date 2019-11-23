/* tslint:disable:jsx-no-lambda */
import { autobind } from "core-decorators";
import { DrawerItemsProps, SafeAreaView } from "react-navigation";
import { fontFamily } from "../lib/styles/styles";
import { Routes } from "./constants";
import {
    ScrollView, StyleSheet, Text, View,
} from "react-native";
import Colours from "../lib/colours/colours";
import getTranslatedText from "../lib/localization/getTranslatedText";
import Icon from "react-native-vector-icons/Feather";
import React, { Component } from "react";

const styles = StyleSheet.create({
    button: {
        backgroundColor:   Colours.SecondaryColour,
        borderRadius:      0,
        height:            56,
        paddingHorizontal: 16,
        width:             "100%",
    },
    closeButton: {
        alignSelf:         "flex-end",
        paddingHorizontal: 16,
        paddingVertical:   8,
    },
    container:     { flex: 1 },
    menuContainer: {
        height:            "100%",
        justifyContent:    "flex-end",
        paddingHorizontal: 32,
    },
    menuText: {
        color:    Colours.GreyColour,
        fontFamily,
        fontSize: 20,
    },
    scrollViewStyle: { height: "100%" },
});

export default class Sidebar extends Component<DrawerItemsProps> {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <SafeAreaView style={styles.container} forceInset={{ horizontal: "never", top: "always" }}>
                    <View style={styles.menuContainer}>
                        <Icon.Button
                            name={"triangle"}
                            size={20}
                            color={Colours.PrimaryColour}
                            style={styles.button}
                            onPress={() => this._handleNavigation(Routes.About)}
                        >
                            <Text style={styles.menuText}>{getTranslatedText("About")}</Text>
                        </Icon.Button>
                        <Icon.Button
                            name={"gift"}
                            size={20}
                            color={Colours.PrimaryColour}
                            style={styles.button}
                            onPress={() => this._handleNavigation(Routes.Donate)}
                        >
                            <Text style={styles.menuText}>{getTranslatedText("Donate")}</Text>
                        </Icon.Button>
                        <Icon.Button
                            name={"minimize"}
                            size={20}
                            color={Colours.PrimaryColour}
                            style={styles.button}
                            onPress={() => this._handleNavigation(Routes.Volunteer)}
                        >
                            <Text style={styles.menuText}>{getTranslatedText("Volunteer")}</Text>
                        </Icon.Button>
                        <Icon.Button
                            name={"award"}
                            size={20}
                            color={Colours.PrimaryColour}
                            style={styles.button}
                            onPress={() => this._handleNavigation(Routes.Credits)}
                        >
                            <Text style={styles.menuText}>{getTranslatedText("Credits")}</Text>
                        </Icon.Button>
                        <Icon.Button
                            name={"settings"}
                            size={20}
                            color={Colours.PrimaryColour}
                            style={styles.button}
                            onPress={() => this._handleNavigation(Routes.Settings)}
                        >
                            <Text style={styles.menuText}>{getTranslatedText("Settings")}</Text>
                        </Icon.Button>
                        <View style={styles.button}>
                            <Icon
                                name={"x"}
                                size={30}
                                color={Colours.PrimaryColour}
                                style={styles.closeButton}
                                onPress={this._handleCloseDrawer}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    }

    @autobind
    private _handleCloseDrawer(): void {
        const { navigation } = this.props;
        navigation.closeDrawer();
    }

    @autobind
    private _handleNavigation(route: Routes): void {
        const { navigation } = this.props;
        navigation.navigate(route);
    }
}
