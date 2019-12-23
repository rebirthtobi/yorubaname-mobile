/* tslint:disable:jsx-no-multiline-js  */

import { appearance, fontFamily } from "../../lib/styles/styles";
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
        ...appearance.bottomShadow,
    },
    headerIconLeft: { marginRight: "auto" },
    headerText:     {
        color:      Colours.SecondaryColour,
        flex:       1,
        fontFamily,
        fontSize:   20,
        fontWeight: "bold",
        textAlign:  "center",
    },
    wrapper: {
        paddingHorizontal: 16,
        paddingVertical:   8,
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

        return (
            <View>
                <View style={styles.headerContainer}>
                    <Icon
                        name={"arrow-left"}
                        color={Colours.SecondaryColour}
                        size={40}
                        style={styles.headerIconLeft}
                        onPress={this._goBack}
                    />
                    <Text style={styles.headerText}>
                        {name}
                    </Text>
                </View>
                <ScrollView style={styles.wrapper}>
                    {meaning ? <NameSection title={`Meaning of ${name}`} content={meaning}/> : null}
                    {extendedMeaning ? <NameSection title={"Extended Meaning"} content={extendedMeaning}/> : null}
                    {morphology ? <NameSection title={"Morphology"} content={morphology}/> : null}
                    {!!etymology.length ? <NameSection title={"Gloss"} content={etymology}/> : null}
                    {!!geoLocation.length ? <NameSection title={"Common in;"} content={geoLocation}/> : null}
                    {famousPeople ? <NameSection title={"Famous People"} content={famousPeople}/> : null}
                    {variants ? <NameSection title={"Variants"} content={variants}/> : null}
                    { media
                        ? <NameSection title={"Media Links"} content={media.split("\n")} onPress={this._handleLinkClick}/>
                        : null
                    }
                </ScrollView>
            </View>
        );
    }

    @autobind
    private _goBack(): void {
        const { navigation } = this.props;
        navigation.goBack();
    }

    @autobind
    private _pronounceName(): void {
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
