import { fontFamily } from "../../lib/styles/styles";
import {
    StyleSheet, Text, TextInput, View, ViewStyle,
} from "react-native";
import Colours from "../../lib/colours/colours";
import React, { ReactElement } from "react";

const styles = StyleSheet.create({
    activeTextAreaStyle: { borderColor: Colours.PrimaryColour },
    labelStyle:          {
        color:        Colours.GreyColour,
        fontFamily,
        fontSize:     14,
        marginBottom: 8,
    },
    textAreaStyle: {
        borderColor:       Colours.GreyColour,
        borderRadius:      2,
        borderWidth:       1,
        color:             Colours.GreyColour,
        fontFamily,
        fontSize:          16,
        height:            150,
        padding:           8,
        textAlignVertical: "top",
    },
});

interface TextAreaProps {
    incomingStyle?: ViewStyle;
    label: string;
    value: string;
    onChangeText: (text: string) => void;
}

export default function TextArea({
    label, incomingStyle, onChangeText, value,
}: TextAreaProps): ReactElement {
    return (
        <View style={incomingStyle}>
            <Text style={styles.labelStyle}>
                {label}
            </Text>
            <TextInput
                multiline
                value={value}
                numberOfLines={4}
                onChangeText={onChangeText}
                style={[styles.textAreaStyle, !!value && styles.activeTextAreaStyle]}
                enablesReturnKeyAutomatically
            />
        </View>
    );
}
