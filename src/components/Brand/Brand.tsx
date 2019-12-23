import { Image, StyleSheet } from "react-native";
import Logo from "../../assets/image/yd-logo-beta.png";
import React, { ReactElement } from "react";

const styles = StyleSheet.create({
    logoStyle: {
        alignSelf:    "center",
        height:       70,
        marginBottom: 16,
        marginTop:    56,
        resizeMode:   "contain",
        width:        "70%",
    },
});

export default function Brand(): ReactElement {
    return <Image source={Logo} style={styles.logoStyle}/>;
}
