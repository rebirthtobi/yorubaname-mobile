import { Text, View } from "react-native";
import React, { Component } from "react";
import withBottomNavigation from "../../components/withBottomNavigation/withBottomNavigation";

class AboutScreen extends Component {
    render() {
        return (
            <View>
                <Text>About Screen</Text>
            </View>
        );
    }
}

export default withBottomNavigation(AboutScreen);
