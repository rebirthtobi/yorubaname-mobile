import {
    Platform, StyleSheet, TouchableWithoutFeedback, View,
} from "react-native";
import Colours from "../../lib/colours/colours";
import Icon from "react-native-vector-icons/Feather";
import React from "react";

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems:      "center",
        backgroundColor: Colours.PrimaryColour,
        borderRadius:    28,
        bottom:          70,
        elevation:       5,
        height:          56,
        justifyContent:  "center",
        position:        "absolute",
        right:           50,
        width:           56,
        ...Platform.select({
            android: { elevation: 2 },
            ios:     {
                shadowColor:  Colours.BlackColour,
                shadowOffset: {
                    height: 2,
                    width:  0,
                },
                shadowOpacity: 0.3,
                shadowRadius:  2,
            },
        }),
    },
});

interface SubmitNameButtonTypes {
    onClick: () => void;
}

export default function SubmitNameButton(props: SubmitNameButtonTypes) {
    return (
        <TouchableWithoutFeedback onPress={props.onClick}>
            <View style={styles.buttonContainer}>
                <Icon name={"edit"} color={Colours.SecondaryColour} size={24}/>
            </View>
        </TouchableWithoutFeedback>
    );
}
