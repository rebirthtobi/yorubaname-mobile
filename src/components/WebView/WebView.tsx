import { autobind } from "core-decorators";
import { WebView as RNWebView } from "react-native-webview";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { WebViewNavigation } from "react-native-webview/lib/WebViewTypes";
import Colours from "../../lib/colours/colours";
import ErrorState from "../ErrorState/ErrorState";
import getTranslatedText from "../../lib/localization/getTranslatedText";
import Loading from "../LoadingState/LoadingState";
import NetInfo, { NetInfoState, NetInfoSubscription } from "@react-native-community/netinfo";
import React, { Component, ReactElement, RefObject } from "react";

const styles = StyleSheet.create({
    reloadButtonTextStyle: {
        backgroundColor: Colours.SecondaryColour,
        borderColor:     Colours.PrimaryColour,
        borderRadius:    9,
        borderWidth:     2,
        color:           Colours.GreyColour,
        fontSize:        18,
        marginTop:       8,
        padding:         16,
    },
});

interface WebViewProps {
    url: string;
}

interface WebViewState {
    isInternetActive: boolean;
    isPageLoadError: boolean;
}

export default class WebView extends Component<WebViewProps, WebViewState> {
    networkEventListener?: NetInfoSubscription;
    webViewRef: RefObject<RNWebView>;

    constructor(props: WebViewProps) {
        super(props);

        this.webViewRef = React.createRef();

        this.state = {
            isInternetActive: this._getInternetState(),
            isPageLoadError:  false,
        };
    }

    componentDidMount(): void {
        this.networkEventListener = NetInfo.addEventListener(this._handleNetworkChange);
    }

    componentWillUnmount(): void {
        if (this.networkEventListener) {
            this.networkEventListener();
        }
    }

    render() {
        const { url } = this.props;
        const { isInternetActive, isPageLoadError } = this.state;

        if (isPageLoadError) {
            const pageLoadErrorCode = 404;
            return this._renderError(undefined, pageLoadErrorCode, "This page is not available right now");
        }

        if (!isInternetActive) {
            return this._renderError(undefined, undefined, getTranslatedText("Your internet is not reachable. Connect to a working internet to continue"), "cloud-off");
        }

        return (
            <RNWebView
                ref={this.webViewRef}
                source={{ uri: url }}
                useWebKit
                originWhitelist={["https://*", "http://*", "tel:*", "mailto:*"]}
                renderError={this._renderError}
                renderLoading={this._renderLoadingIndicator}
                startInLoadingState
                javaScriptEnabled
                onShouldStartLoadWithRequest={this._handleLoadRequest}
                onError={this._handleLoadError}
            />
        );
    }

    @autobind
    private _renderError(errorDomain?: string, errorCode?: number, errorDesc?: string, errorIcon?: string): ReactElement {
        return (
            <ErrorState
                errorDomain={errorDomain}
                errorCode={errorCode}
                errorDesc={errorDesc}
                errorIcon={errorIcon}
            >
                {this._renderReloadButton()}
            </ErrorState>
        );
    }

    @autobind
    private _renderLoadingIndicator(): ReactElement {
        return <Loading />;
    }

    @autobind
    private _handleLoadRequest(request: WebViewNavigation): boolean {
        const { url } = request;
        const { url: propsUrl } = this.props;
        return url === propsUrl;
    }

    @autobind
    private _getInternetState(): boolean {
        let internetState: boolean = false;
        NetInfo.fetch().then(state => {
            internetState = !!state.isInternetReachable;
        });

        return internetState;
    }

    @autobind
    private _handleNetworkChange(state: NetInfoState): void {
        this.setState({ isInternetActive: !!state.isInternetReachable });
    }

    @autobind
    private _handleLoadError(): void {
        this.setState({ isPageLoadError: true });
    }

    @autobind
    private _reloadWebPage(): void {
        this.setState({ isPageLoadError: false });
        if (this.webViewRef.current) {
            this.webViewRef.current.reload();
        }
    }

    @autobind
    private _renderReloadButton(): ReactElement {
        return (
            <TouchableOpacity
                onPress={this._reloadWebPage}
            >
                <Text style={styles.reloadButtonTextStyle}>Reload</Text>
            </TouchableOpacity>
        );
    }
}
