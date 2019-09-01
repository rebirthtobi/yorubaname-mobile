import { autobind } from "core-decorators";
import {
    StyleSheet, Text, TextInput, View, ViewStyle,
} from "react-native";
import Colours from "../../lib/colours/colours";
import React, { Component } from "react";

const focusedAFontSize = 14;
const unFocusedFontSize = 20;
const focusedTopPosition = 4;
const unFocusedTopPosition = 28;
const focusedPadding = 0;
const unFocusedPadding = 4;

const getAnimatedStyle = (isFocused: boolean) => StyleSheet.create({
    container: {
        height:     64,
        paddingTop: 18,
    },
    textInput: {
        borderBottomColor: isFocused ? Colours.PrimaryColour : Colours.GreyColour,
        borderBottomWidth: 1,
        color:             Colours.GreyColour,
        fontSize:          20,
        height:            50,
    },
    textInputFocus: { borderBottomColor: Colours.PrimaryColour },
    textLabelStyle: {
        color:    isFocused ?  Colours.GreyColour : Colours.PrimaryColour,
        fontSize: isFocused ? focusedAFontSize : unFocusedFontSize,
        left:     isFocused ? focusedPadding : unFocusedPadding,
        position: "absolute",
        top:      isFocused ? focusedTopPosition : unFocusedTopPosition,
    },
});

interface FloatingTextFieldState {
    isFocused: boolean;
}

interface FloatingTextFieldProps {
    textLabel: string;
    textInput: string;
    onChangeText: (name: string) => void;
    incomingStyle?: ViewStyle;
}

export default class FloatingLabelInput extends Component<FloatingTextFieldProps, FloatingTextFieldState> {
    state = { isFocused: false };

    render() {
        const { incomingStyle, onChangeText, textLabel, textInput } = this.props;
        const isInputFocused = this._isFocused();
        const styles = getAnimatedStyle(isInputFocused);

        return (
            <View style={[styles.container, incomingStyle]}>
                <Text style={styles.textLabelStyle}>
                    {textLabel}
                </Text>
                <TextInput
                    style={[styles.textInput, isInputFocused && styles.textInputFocus]}
                    onFocus={this._handleTextInputFocus}
                    onBlur={this._handleTextInputBlur}
                    value={textInput}
                    onChangeText={onChangeText}
                    blurOnSubmit
                />
            </View>
        );
    }

    @autobind
    private _handleTextInputFocus(): void {
        this.setState({ isFocused: true });
    }

    @autobind
    private _handleTextInputBlur(): void {
        this.setState({ isFocused: false });
    }

    @autobind
    private _isFocused(): boolean {
        const { isFocused } = this.state;
        const { textInput } = this.props;

        return isFocused || !!textInput;
    }
}
