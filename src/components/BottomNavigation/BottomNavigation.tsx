import { appearance, fontFamily } from "../../lib/styles/styles";
import { autobind } from "core-decorators";
import { NavigationScreenProps } from "react-navigation";
import { StyleSheet, Text, View } from "react-native";
import Colours from "../../lib/colours/colours";
import Icon from "react-native-vector-icons/Feather";
import React, { Component } from "react";

const styles = StyleSheet.create({
    bottomBar: {
        alignItems:      "center",
        backgroundColor: Colours.SecondaryColour,
        flexDirection:   "row",
        height:          49,
        justifyContent:  "space-between",
        marginTop:       "auto",
        padding:         0,
        ...appearance.topShadow,
    },
    button:     { backgroundColor: Colours.SecondaryColour },
    buttonText: {
        color:      Colours.GreyColour,
        fontFamily,
        fontSize:   16,
        fontWeight: "bold",
    },
    iconStyle: { marginRight: 0 },
});

class BottomNavigation extends Component<NavigationScreenProps> {
    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.bottomBar}>
                <Icon.Button
                    name={"chevron-left"}
                    onPress={this._handleBackClick}
                    color={Colours.PrimaryColour}
                    style={styles.button}
                    size={30}
                    iconStyle={styles.iconStyle}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </Icon.Button>
                {navigation.toggleDrawer
                    ? <Icon.Button
                        name={"menu"}
                        onPress={this._handleDrawerToggle}
                        color={Colours.PrimaryColour}
                        style={styles.button}
                        size={30}
                    />
                    : null
                }
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
