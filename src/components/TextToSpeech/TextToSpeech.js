/* tslint:disable  */
import { Platform } from "react-native";
import React, { Component } from "react";
import Tts from "react-native-tts";

export const TtsContext = React.createContext(null);

export class TtsContextProvider extends Component {
    state = {
        hasChecked:     false,
        isTtsSupported: false,
    };

    componentDidMount() {
        Tts.getInitStatus().then(async() => {
            this.setState({
                hasChecked:     true,
                isTtsSupported: true,
            });
            Tts.voices().then(voices => {
                const filteredVoice = voices.filter(voice => voice.language === "yo" && !voice.networkConnectionRequired
                    && !voice.notInstalled);
                if (filteredVoice.length) {
                    const [defaultVoice] = filteredVoice;
                    this._setDefaultTtsConfig(defaultVoice);
                }
            });
        }, err => {
            if (err.code === "no_engine") {
                Tts.requestInstallEngine();
                this.setState({ hasChecked: true });
            }
        });
    }

    componentWillUnmount() {
        const { isTtsSupported } = this.state;
        if (isTtsSupported) {
            Tts.stop();
        }
    }

    render() {
        const { children } = this.props;
        const { isTtsSupported, hasChecked } = this.state;

        return (
            <TtsContext.Provider
                value={{
                    hasChecked,
                    isTtsSupported,
                    speak: name => () => Tts.speak(name),
                    stop:  Tts.stop,
                }}
            >
                {children}
            </TtsContext.Provider>
        );
    }

    _setDefaultTtsConfig = defaultVoice => {
        Tts.setDucking(true);
        Tts.setDefaultLanguage(defaultVoice.language);
        Tts.setDefaultVoice(defaultVoice.id);
    }
}

export function withTextToSpeech(WrappedComponent) {
    function withTextToSpeech(props) {
        return (
            <TtsContextProvider>
                <WrappedComponent {...props} />
            </TtsContextProvider>
        );
    }

    withTextToSpeech.displayName = `withTextToSpeech(${WrappedComponent.displayName || WrappedComponent.name})`;

    return withTextToSpeech;
}
