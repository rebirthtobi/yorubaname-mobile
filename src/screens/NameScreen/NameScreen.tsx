/* tslint:disable:jsx-no-lambda */

import { autobind } from "core-decorators";
import {
    Linking,
    ScrollView, StyleSheet, Text, View,
} from "react-native";
import { NameType } from "../../lib/dataManager/data";
import { NavigationScreenProps } from "react-navigation";
import Colours from "../../lib/colours/colours";
import Icon from "react-native-vector-icons/Feather";
import NameSection from "../../components/NameSection/NameSection";
import React, { Component } from "react";
import withSafeAreaView from "../../components/withSafeAreaView/withSafeAreaView";

const styles = StyleSheet.create({
    headerContainer: {
        alignItems:        "center",
        backgroundColor:   Colours.PrimaryColour,
        flexDirection:     "row",
        height:            56,
        paddingHorizontal: 16,
        paddingVertical:   4,
    },
    headerIcon: { marginRight: "auto" },
    headerText: {
        color:      Colours.SecondaryColour,
        flex:       1,
        fontSize:   20,
        fontWeight: "bold",
        textAlign:  "center",
    },
    nameContainer: {
        alignItems:    "center",
        flexDirection: "row",
    },
    nameSingle: {
        backgroundColor: Colours.PrimaryColour,
        color:           Colours.SecondaryColour,
        fontSize:        70,
        textAlign:       "center",
        width:           "30%",
    },
    nameStyle: {
        color:             Colours.GreyColour,
        fontSize:          18,
        paddingHorizontal: 8,
    },
});

interface NameScreenState {
    nameObject: NameType;
}

class NameScreen extends Component<NavigationScreenProps, NameScreenState> {
    render() {
        const {
            extendedMeaning,
            etymology,
            famousPeople,
            geoLocation,
            meaning,
            media,
            morphology,
            name,
            variants,
        } = this._getNameObject();
        const firstAlphabetIndex = 0;

        return (
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Icon
                        name={"arrow-left"}
                        color={Colours.SecondaryColour}
                        size={40}
                        style={styles.headerIcon}
                        onPress={this._goBack}
                    />
                    <Text style={styles.headerText}>
                        {name}
                    </Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameSingle}>{name.charAt(firstAlphabetIndex)}</Text>
                    <Text style={styles.nameStyle}>{name}</Text>
                </View>
                {meaning && <NameSection title={`Meaning of ${name}`} content={meaning}/>}
                {extendedMeaning && <NameSection title={"Extended Meaning"} content={extendedMeaning}/>}
                {morphology && <NameSection title={"Morphology"} content={morphology}/>}
                {!!etymology.length && <NameSection title={"Gloss"} content={etymology}/>}
                {!!geoLocation.length && <NameSection title={"Common in;"} content={geoLocation}/>}
                {famousPeople && <NameSection title={"Famous People"} content={famousPeople}/>}
                {variants && <NameSection title={"Variants"} content={variants}/>}
                {media && <NameSection title={"Media Links"} content={media} onPress={() => this._handleLinkClick(media)}/>}
            </ScrollView>
        );
    }

    @autobind
    private _goBack(): void {
        const { navigation } = this.props;
        navigation.goBack();
    }

    @autobind
    private _getNameObject(): NameType {
        const { navigation } = this.props;
        return navigation.getParam("item");
    }

    @autobind
    private async _handleLinkClick(url: string): Promise<void> {
        if (await Linking.canOpenURL(url)) {
            await Linking.openURL(url);
        }
    }
}

export default withSafeAreaView(NameScreen);
