import { autobind } from "core-decorators";
import { fontFamily } from "../../lib/styles/styles";
import {
    Linking, ScrollView, StyleSheet, Text,
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import Brand from "../../components/Brand/Brand";
import Colours from "../../lib/colours/colours";
import React, { Component } from "react";
import Urls from "../../lib/urls/urls";
import withBottomNavigation from "../../components/withBottomNavigation/withBottomNavigation";
import withSafeAreaView from "../../components/withSafeAreaView/withSafeAreaView";

const styles = StyleSheet.create({
    creditTextStyle: {
        color:     Colours.GreyColour,
        fontFamily,
        fontSize:  16,
        margin:    16,
        textAlign: "center",
    },
    linkNameStyle: {
        color:     Colours.PrimaryColour,
        textAlign: "center",
    },
});

class CreditsScreen extends Component<NavigationScreenProps> {
    render() {
        return (
            <ScrollView>
                <Brand/>
                <Text style={styles.creditTextStyle}>
                    The YorubaName App is built out of a thirst to contribute to the Yorùbá Names Project, and to afford
                    people a chance to better access the names on the go, via a mobile app, in a way that the web
                    application might not be able to support. The app will continue to be in development, and more
                    functionalities will be added as time goes on. Thank you.
                </Text>

                <Text style={styles.creditTextStyle}>
                    Build with Love by
                    <Text style={styles.linkNameStyle} onPress={this._handleNameLink}> Tobi Taiwo (rebirthtobi)</Text>
                </Text>
            </ScrollView>
        );
    }

    @autobind
    private async _handleNameLink(): Promise<void> {
        await Linking.canOpenURL(Urls.LinkedIn).then(
            async isSupported => {
                if (isSupported) {
                    await Linking.openURL(Urls.LinkedIn);
                }
            }
        );
    }
}

export default withSafeAreaView(withBottomNavigation(CreditsScreen));
