import { StyleSheet, Text, View } from "react-native";
import Colours from "../../lib/colours/colours";
import Icon from "react-native-vector-icons/Feather";
import React, { ReactElement } from "react";

const styles = StyleSheet.create({
    containerStyle: {
        alignItems:     "center",
        height:         "100%",
        justifyContent: "center",
    },
    descriptionStyle: {
        color:    Colours.GreyColour,
        fontSize: 20,
    },
});

function EmptyState({ description }: {description: string}): ReactElement {
    return (
        <View style={styles.containerStyle}>
            <Icon
                name={"package"}
                size={150}
                color={Colours.GreyColour}
            />
            <Text style={styles.descriptionStyle}> {description} </Text>
        </View>
    );
}

export default EmptyState;
