import { Image, StyleSheet, View } from "react-native";
import Loader from "../../assets/image/loading.gif";
import React, { ReactElement } from "react";

const styles = StyleSheet.create({
    containerStyle: {
        alignItems:     "center",
        height:         "100%",
        justifyContent: "center",
    },
    loaderStyle: { paddingHorizontal: 16 },
});

export default function LoadingState(): ReactElement {
    return (
        <View style={styles.containerStyle}>
            <Image source={Loader} style={styles.loaderStyle}/>
        </View>
    );
}
