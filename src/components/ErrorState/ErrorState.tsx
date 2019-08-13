import { autobind } from "core-decorators";
import { StyleSheet, Text, View } from "react-native";
import Colours from "../../lib/colours/colours";
import Icon from "react-native-vector-icons/Feather";
import React, { Component, ReactElement } from "react";

const styles = StyleSheet.create({
    errorCodeStyle: {
        color:    Colours.DangerColour,
        flex:     1,
        fontSize: 30,
    },
    errorDescStyle: {
        color:     Colours.GreyColour,
        fontSize:  16,
        textAlign: "center",
    },
    errorDomainStyle: {
        color:           Colours.MutedColour,
        fontSize:        14,
        paddingVertical: 16,
        textAlign:       "center",
    },
});

interface ErrorStateProps {
    errorDomain?: string;
    errorCode?: number;
    errorDesc?: string;
}

export default class ErrorState extends Component<ErrorStateProps> {
    render() {
        const { errorDomain, errorDesc, errorCode } = this.props;

        return (
            <View>
                {this._renderErrorImage(errorCode)}
                {errorDomain && <Text style={styles.errorDomainStyle}> {errorDomain} </Text>}
                <Text style={styles.errorDescStyle}> {errorDesc} </Text>
            </View>
        );
    }

    @autobind
    private _renderErrorImage(errorCode?: number): ReactElement {
        if (errorCode) {
            return <Text style={styles.errorCodeStyle}> {errorCode} </Text>;
        }

        return <Icon name={"alert-triangle"} size={50} color={Colours.DangerColour} />;
    }
}
