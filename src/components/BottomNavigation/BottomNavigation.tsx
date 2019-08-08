import { autobind } from "core-decorators";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { Routes } from "../../navigation/constants";
import { View } from "react-native";
import Colours from "../../lib/colours/colours";
import Icon from "react-native-vector-icons/Feather";
import React, { Component } from "react";

class BottomNavigation extends Component<NavigationInjectedProps> {
    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                <Icon.Button
                    name={"chevron-left"}
                    color={Colours.primaryColour}
                    onPress={this._handleBackClick}
                >
                    Back
                </Icon.Button>
                <Icon.Button
                    name={"menu"}
                    color={Colours.primaryColour}
                    onPress={this._handleDrawerToggle}
                />
            </View>
        );
    }

    @autobind
    private _handleBackClick(): void {
        const { navigation } = this.props;
        navigation.navigate({ routeName: Routes.Search });
    }

    @autobind
    private _handleDrawerToggle(): void {
        const { navigation } = this.props;
        navigation.toggleDrawer();
    }
}
export default withNavigation(BottomNavigation);
