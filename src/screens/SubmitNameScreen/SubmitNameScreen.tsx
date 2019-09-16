import * as Sentry from "@sentry/react-native";
import { autobind } from "core-decorators";
import { NavigationScreenProps } from "react-navigation";
import {
    StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import ApiManager from "../../lib/apiManager/apiManager";
import Colours from "../../lib/colours/colours";
import FloatingLabelInput from "../../components/FloatingTextField/FloatingTextField";
import getTranslatedText from "../../lib/localization/getTranslatedText";
import Icon from "react-native-vector-icons/Feather";
import React, { Component } from "react";
import TextArea from "../../components/TextArea/TextArea";
import Toast from "react-native-root-toast";
import withSafeAreaView from "../../components/withSafeAreaView/withSafeAreaView";

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems:      "center",
        backgroundColor: Colours.PrimaryColour,
        height:          56,
        justifyContent:  "center",
        marginTop:       "auto",
    },
    buttonText: {
        color:      Colours.SecondaryColour,
        fontSize:   20,
        fontWeight: "bold",
    },
    commonStyle:   { marginBottom: 16 },
    formContainer: {
        flex:              1,
        marginBottom:      24,
        paddingHorizontal: 16,
    },
    headerContainer: {
        alignItems:        "center",
        flexDirection:     "row",
        height:            56,
        paddingHorizontal: 16,
        paddingVertical:   4,
    },
    headerIcon: { marginRight: "auto" },
    headerText: {
        color:      Colours.PrimaryColour,
        flex:       1,
        fontSize:   20,
        fontWeight: "bold",
        textAlign:  "center",
    },
    wrapper: { flex: 1 },
});

interface LocationType {
    id: string;
    name: string;
}

interface SubmitNameState {
    name: string;
    email: string;
    details: string;
    locations: LocationType[];
}

function isValid(field: string): boolean {
    return !!(field && field.trim());
}

function isEmailValid(field: string): boolean {
    // eslint-disable-next-line max-len
    return isValid(field) && !!field.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

class SubmitNameScreen extends Component<NavigationScreenProps, SubmitNameState> {
    state = {
        details:   "",
        email:     "",
        locations: [],
        name:      "",
    };

    render() {
        const { details, email, name } = this.state;

        return (
            <View style={styles.wrapper}>
                <View style={styles.headerContainer}>
                    <Icon
                        name={"arrow-left"}
                        color={Colours.PrimaryColour}
                        size={40}
                        style={styles.headerIcon}
                        onPress={this._goBack}
                    />
                    <Text style={styles.headerText}>
                        {getTranslatedText("Suggest a Name")}
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    <FloatingLabelInput
                        textInput={name}
                        textLabel={getTranslatedText("New Name")}
                        onChangeText={this._handleNameChange}
                        incomingStyle={styles.commonStyle}
                    />
                    <FloatingLabelInput
                        textInput={email}
                        textLabel={getTranslatedText("Notification Email")}
                        onChangeText={this._handleEmailChange}
                        incomingStyle={styles.commonStyle}
                    />
                    <TextArea
                        label={getTranslatedText("Meaning/History of Name")}
                        value={details}
                        onChangeText={this._handleDetailsChange}
                        incomingStyle={styles.commonStyle}
                    />
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={this._submitForm}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>
                            {getTranslatedText("Suggest")}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    @autobind
    private _resetForm(): void {
        this.setState({
            details: "",
            email:   "",
            name:    "",
        });
    }

    @autobind
    private _goBack(): void {
        const { navigation } = this.props;
        navigation.goBack();
    }

    @autobind
    private _handleNameChange(name: string): void {
        this.setState({ name });
    }

    @autobind
    private _handleEmailChange(email: string): void {
        this.setState({ email });
    }

    @autobind
    private _handleDetailsChange(details: string): void {
        this.setState({ details });
    }

    @autobind
    private async _submitForm(): Promise<void> {
        const { details, email, name } = this.state;

        if (isValid(details) && isEmailValid(email) && isValid(name)) {
            Sentry.addBreadcrumb({
                category: "suggest_name",
                data:     { details, email, name },
                level:    Sentry.Severity.Info,
                message:  "Api call for Suggestion of name",
            });

            try {
                Sentry.captureMessage("Submitting suggest name form", Sentry.Severity.Info);
                await ApiManager.submitSuggestedName({ details, email, name });
                this._resetForm();
                Toast.show(getTranslatedText("Suggested name submitted successfully"), {
                    animation:   true,
                    duration:    Toast.durations.LONG,
                    hideOnPress: false,
                    position:    Toast.positions.BOTTOM,
                    shadow:      true,
                });
                Sentry.captureMessage("Submitting form successful", Sentry.Severity.Info);
            } catch (e) {
                Sentry.captureMessage("Submitting form", Sentry.Severity.Fatal);
                Sentry.captureException(e);
                Toast.show(getTranslatedText("Error submitting suggested name"), {
                    animation:   true,
                    duration:    Toast.durations.LONG,
                    hideOnPress: false,
                    position:    Toast.positions.BOTTOM,
                    shadow:      true,
                });
            }
        } else {
            Sentry.addBreadcrumb({
                category: "suggest_name",
                data:     { details, email, name },
                level:    Sentry.Severity.Info,
                message:  "Suggestion of name incorrect data",
            });

            Sentry.captureMessage("Suggestion of name validation failed", Sentry.Severity.Error);

            Toast.show(getTranslatedText("All fields are required and must be valid"), {
                animation:   true,
                duration:    Toast.durations.LONG,
                hideOnPress: false,
                position:    Toast.positions.BOTTOM,
                shadow:      true,
            });
        }
    }

    @autobind
    private _handleLocationChange(locations: LocationType[]): void {
        this.setState({ locations });
    }
}

export default withSafeAreaView(SubmitNameScreen);
