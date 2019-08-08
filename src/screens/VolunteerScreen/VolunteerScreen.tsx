import { Text, View } from "react-native";
import React, { Component } from "react";
import withBottomNavigation from "../../components/withBottomNavigation/withBottomNavigation";

class VolunteerScreen extends Component {
    render() {
        return (
            <View>
                <Text>VolunteerScreen</Text>
            </View>
        );
    }
}

export default withBottomNavigation(VolunteerScreen);
