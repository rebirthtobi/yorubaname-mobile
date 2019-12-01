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
                    Yoruba Name App is build out of a thirst to contribute to the yoruba name project. It is also
                    a thoughtful thinking that as people gets to open applications faster, building a mobile app could
                    make it faster for people ti access the resources the yorubaname project tend to answer and at the
                    long run, contributing to the overall objective of the yoruba name project.
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
