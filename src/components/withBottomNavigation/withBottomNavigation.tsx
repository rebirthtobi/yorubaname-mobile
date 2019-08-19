import { NavigationScreenProps } from "react-navigation";
import { StyleSheet, View } from "react-native";
import BottomNavigation from "../BottomNavigation/BottomNavigation";
import React from "react";

const styles = StyleSheet.create({ mainView: { flex: 1 } });

export default function withBottomNavigation<P>(WrappedComponent: React.ComponentType<NavigationScreenProps>) {
    function withButtonNavigation(props: NavigationScreenProps) {
        const { navigation } = props;
        return (
            <View style={styles.mainView}>
                <WrappedComponent {...props}/>
                <BottomNavigation navigation={navigation}/>
            </View>
        );
    }

    withButtonNavigation.displayName = `withBottomNavigation(${WrappedComponent.displayName || WrappedComponent.name})`;

    return withButtonNavigation;
}