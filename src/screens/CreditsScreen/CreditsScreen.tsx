import { NavigationScreenProps } from "react-navigation";
import { View } from "react-native";
import LoadingState from "../../components/LoadingState/LoadingState";
import React, { Component } from "react";
import withBottomNavigation from "../../components/withBottomNavigation/withBottomNavigation";

class CreditsScreen extends Component<NavigationScreenProps> {
    render() {
        return (
            <View>
                <LoadingState/>
            </View>
        );
    }
}

export default withBottomNavigation(CreditsScreen);
