import { Text, View } from "react-native";
import React, { Component } from "react";
import withBottomNavigation from "../../components/withBottomNavigation/withBottomNavigation";

class CreditsScreen extends Component {
    render() {
        return (
            <View>
                <Text>CreditsScreen</Text>
            </View>
        );
    }
}

export default withBottomNavigation(CreditsScreen);
