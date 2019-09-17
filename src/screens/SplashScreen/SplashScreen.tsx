import { AppInfoType, DataManagerType } from "../../lib/dataManager/data";
import {
    Image, StyleSheet, Text, View,
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Routes } from "../../navigation/constants";
import Colours from "../../lib/colours/colours";
import DataManager from "../../lib/dataManager/dataManager";
import getTranslatedText from "../../lib/localization/getTranslatedText";
import LoadingState from "../../components/LoadingState/LoadingState";
import Logo from "../../assets/image/ynlogo.png";
import React, { Component } from "react";
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
    appNameStyle: {
        color:      Colours.PrimaryColour,
        fontSize:   20,
        fontWeight: "bold",
        textAlign:  "center",
    },
    containerStyle: {
        alignItems:      "center",
        backgroundColor: Colours.SecondaryColour,
        height:          "100%",
        justifyContent:  "center",
        width:           "100%",
    },
    logoStyle: {
        alignSelf:    "center",
        height:       150,
        marginBottom: 16,
        resizeMode:   "center",
        width:        "80%",
    },
});

interface SplashScreenState {
    progressBar: number;
}

export default class SplashScreen extends Component<NavigationScreenProps, SplashScreenState> {
    async componentDidMount(): Promise<void> {
        const appInfo: DataManagerType = await DataManager.getData("@app") as AppInfoType;
        const { navigation } = this.props;

        if (appInfo && appInfo.isInitialised) {
            navigation.navigate(Routes.AppStack);
        } else {
            const isFetchingError = await DataManager.initialiseApp();
            if (!isFetchingError) {
                Toast.show(getTranslatedText("Names database failed to initialized, You can try again in the settings menu"), {
                    animation:   true,
                    duration:    Toast.durations.LONG,
                    hideOnPress: false,
                    position:    Toast.positions.BOTTOM,
                    shadow:      true,
                });
            }
            navigation.navigate(Routes.AppStack);
        }
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Image source={Logo} style={styles.logoStyle}/>
                <Text style={styles.appNameStyle}>Yoruba Name</Text>
                <LoadingState small/>
            </View>
        );
    }
}
