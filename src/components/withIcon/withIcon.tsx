import { StyleSheet, View } from "react-native";
import Colours from "../../lib/colours/colours";
import Icon from "react-native-vector-icons/Feather";
import React from "react";

interface WithIconProps {
    name: string;
    isMaterialDesign?: boolean;
    onPress?(): void;
}

const styles = StyleSheet.create({
    containerStyle: {
        alignItems:       "center",
        borderColor:      Colours.PrimaryColour,
        borderRadius:     7,
        borderWidth:      1,
        flexDirection:    "row",
        marginHorizontal: 16,
    },
    icon: {
        backgroundColor:   Colours.SecondaryColour,
        paddingVertical:   7,
        textAlign:         "center",
        textAlignVertical: "center",
    },
    mainComponent: {
        borderWidth:      0,
        flex:             1,
        marginHorizontal: 0,
    },
    material: {
        borderBottomWidth: 1,
        borderRadius:      0,
        borderWidth:       0,
    },
});

export default function withIcon<P>(WrappedComponent: React.ComponentType<P & WithIconProps>) {
    function withIcon(props: P & WithIconProps) {
        const { isMaterialDesign, name, onPress } = props;
        return (
            <View style={[styles.containerStyle, isMaterialDesign && styles.material]}>
                <WrappedComponent {...props} injectedStyles={styles.mainComponent} onPress={onPress}/>
                <Icon.Button
                    style={styles.icon}
                    name={name}
                    color={Colours.PrimaryColour}
                    onPress={onPress}
                    size={30}
                    backgroundColor={Colours.SecondaryColour}
                />
            </View>
        );
    }

    withIcon.displayName = `withIcon(${WrappedComponent.displayName || WrappedComponent.name})`;

    return withIcon;
}
