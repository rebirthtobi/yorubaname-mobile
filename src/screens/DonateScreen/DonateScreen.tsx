import { NavigationScreenProps } from "react-navigation";
import { Text, View } from "react-native";
import React, { Component } from "react";
import withBottomNavigation from "../../components/withBottomNavigation/withBottomNavigation";

class DonateScreen extends Component<NavigationScreenProps> {
    render() {
        return (
            <View>
                <Text>DonateScreen</Text>
            </View>
        );
    }
}

export default withBottomNavigation(DonateScreen);
