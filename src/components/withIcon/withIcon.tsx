import { StyleSheet, View } from "react-native";
import Colours from "../../lib/colours/colours";
import Icon from "react-native-vector-icons/Feather";
import React from "react";
import withIconPositions from "../../lib/withIconPositions/withIconPositions";

interface WithIconProps {
    position: withIconPositions;
    name: string;
}

const styles = StyleSheet.create({
    containerStyle: {
        alignItems:       "center",
        borderColor:      Colours.PrimaryColour,
        borderRadius:     9,
        borderWidth:      1,
        flexDirection:    "row",
        marginHorizontal: 16,
    },
    leftIcon: {
        fontSize:   30,
        marginLeft: 8,
    },
    mainComponent: {
        borderWidth:      0,
        flex:             1,
        marginHorizontal: 0,
    },
    rightIcon: {
        fontSize:    30,
        marginRight: 8,
    },
});

function getIconStyle(position: withIconPositions): object {
    return (position === withIconPositions.Right) ? styles.rightIcon : styles.leftIcon;
}

export default function withIcon<P>(WrappedComponent: React.ComponentType<P>, iconProps: WithIconProps) {
    function withIcon(props: P) {
        const { position, name } = iconProps;
        return (
            <View style={styles.containerStyle}>
                <WrappedComponent {...props} injectedStyles={styles.mainComponent}/>
                <Icon style={getIconStyle(position)} name={name} color={Colours.PrimaryColour}/>
            </View>
        );
    }

    withIcon.displayName = `withIcon(${WrappedComponent.displayName || WrappedComponent.name})`;

    return withIcon;
}
