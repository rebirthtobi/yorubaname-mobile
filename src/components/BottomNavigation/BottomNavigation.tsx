import { autobind } from "core-decorators";
import { NavigationScreenProps } from "react-navigation";
import { Routes } from "../../navigation/constants";
import { StyleSheet, View } from "react-native";
import Colours from "../../lib/colours/colours";
import Icon from "react-native-vector-icons/Feather";
import React, { Component } from "react";

const styles = StyleSheet.create({
    bottomBar: {
        alignItems:      "center",
        backgroundColor: Colours.SecondaryColour,
        borderColor:     Colours.PrimaryColour,
        borderTopWidth:  1,
        flexDirection:   "row",
        height:          49,
        justifyContent:  "space-between",
        marginTop:       "auto",
        padding:         0,
    },
    button: {
        backgroundColor:   Colours.SecondaryColour,
        fontSize:          12,
        height:            "100%",
        paddingHorizontal: 16,
    },
});

class BottomNavigation extends Component<NavigationScreenProps> {
    render() {
        return (
            <View style={styles.bottomBar}>
                <Icon.Button
                    name={"chevron-left"}
                    onPress={this._handleBackClick}
                    color={Colours.PrimaryColour}
                    style={styles.button}
                >
                    Back
                </Icon.Button>
                <Icon.Button
                    name={"menu"}
                    onPress={this._handleDrawerToggle}
                    color={Colours.PrimaryColour}
                    style={styles.button}
                />
            </View>
        );
    }

    @autobind
    private _handleBackClick(): void {
        const { navigation } = this.props;
        navigation.goBack();
    }

    @autobind
    private _handleDrawerToggle(): void {
        const { navigation } = this.props;
        navigation.toggleDrawer();
    }
}
export default BottomNavigation;
