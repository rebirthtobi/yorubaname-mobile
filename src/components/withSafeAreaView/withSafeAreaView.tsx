import { SafeAreaView, StyleSheet } from "react-native";
import Colours from "../../lib/colours/colours";
import React from "react";

const styles = StyleSheet.create({
    safeViewWrapper: {
        backgroundColor: Colours.SecondaryColour,
        flex:            1,
    },
});

export default function withSafeAreaView<P>(WrappedComponent: React.ComponentType<P>) {
    function withSafeAreaView(props: P) {
        return (
            <SafeAreaView style={styles.safeViewWrapper}>
                <WrappedComponent {...props}/>
            </SafeAreaView>
        );
    }

    withSafeAreaView.displayName = `withSafeAreaView(${WrappedComponent.displayName || WrappedComponent.name})`;

    return withSafeAreaView;
}
