import { View } from "react-native";
import BottomNavigation from "../BottomNavigation/BottomNavigation";
import React from "react";

export default function withBottomNavigation<P>(WrappedComponent: React.ComponentType<P>) {
    function withButtonNavigation(props: P) {
        return (
            <View>
                <WrappedComponent {...props}/>
                <BottomNavigation />
            </View>
        );
    }

    withButtonNavigation.displayName = `withBottomNavigation(${WrappedComponent.displayName || WrappedComponent.name})`;

    return withButtonNavigation;
}
