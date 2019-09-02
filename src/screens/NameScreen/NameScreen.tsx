/* tslint:disable:jsx-no-lambda */
/* eslint-disable max-len */

import { autobind } from "core-decorators";
import {
    Linking,
    ScrollView, StyleSheet, Text, View,
} from "react-native";
import { NameType } from "../../lib/dataManager/data";
import { NavigationScreenProps } from "react-navigation";
import Colours from "../../lib/colours/colours";
import NameSection from "../../components/NameSection/NameSection";
import React, { Component } from "react";

const styles = StyleSheet.create({
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

export default class NameScreen extends Component<NavigationScreenProps, NameScreenState> {
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
