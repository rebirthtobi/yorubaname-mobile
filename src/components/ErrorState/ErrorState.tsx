import { autobind } from "core-decorators";
import { StyleSheet, Text, View } from "react-native";
import Colours from "../../lib/colours/colours";
import Icon from "react-native-vector-icons/Feather";
import React, { Component, ReactElement } from "react";

const styles = StyleSheet.create({
    containerStyle: {
        alignItems:     "center",
        height:         "100%",
        justifyContent: "center",
    },
    errorCodeContainerStyle: {
        borderColor:    Colours.DangerColour,
        borderRadius:   100,
        borderWidth:    3,
        height:         200,
        justifyContent: "center",
        textAlign:      "center",
        width:          200,
    },
    errorCodeStyle: {
        color:     Colours.DangerColour,
        fontSize:  100,
        textAlign: "center",
    },
    errorDescStyle: {
        color:     Colours.GreyColour,
        fontSize:  20,
        textAlign: "center",
    },
    errorDomainStyle: {
        color:           Colours.MutedColour,
        fontSize:        14,
        fontWeight:      "bold",
        paddingVertical: 16,
        textAlign:       "center",
    },
});

interface ErrorStateProps {
    errorDomain?: string;
    errorCode?: number;
    errorDesc?: string;
    errorIcon?: string;
}

export default class ErrorState extends Component<ErrorStateProps> {
    render() {
        const {
            errorDomain, errorDesc, errorCode, errorIcon,
        } = this.props;

        return (
            <View style={styles.containerStyle}>
                {this._renderErrorImage(errorCode, errorIcon)}
                {errorDomain && <Text style={styles.errorDomainStyle}> {errorDomain} </Text>}
                <Text style={styles.errorDescStyle}> {errorDesc} </Text>
            </View>
        );
    }

    @autobind
    private _renderErrorImage(errorCode?: number, errorIcon?: string): ReactElement {
        if (errorCode && !errorIcon) {
            return (
                <View style={styles.errorCodeContainerStyle}>
                    <Text style={styles.errorCodeStyle}> {errorCode} </Text>
                </View>
            );
        }

        const iconName = errorIcon ? errorIcon : "alert-triangle";
        return <Icon name={iconName} size={150} color={Colours.DangerColour} />;
    }
}
