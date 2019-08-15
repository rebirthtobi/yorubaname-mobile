import { autobind } from "core-decorators";
import { WebView as RNWebView } from "react-native-webview";
import { WebViewNavigation } from "react-native-webview/lib/WebViewTypes";
import ErrorState from "../ErrorState/ErrorState";
import Loading from "../LoadingState/LoadingState";
import NetInfo, { NetInfoState, NetInfoSubscription } from "@react-native-community/netinfo";
import React, { Component, ReactElement } from "react";

interface WebViewProps {
    url: string;
}

interface WebViewState {
    isInternetActive: boolean;
}

export default class WebView extends Component<WebViewProps, WebViewState> {
    networkEventListener?: NetInfoSubscription;

    constructor(props: WebViewProps) {
        super(props);

        this.state = { isInternetActive: this._getInternetState() };
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
        const { isInternetActive } = this.state;

        if (!isInternetActive) {
            return (
                <ErrorState
                    errorIcon={"cloud-off"}
                    errorDesc={"Your internet is not reachable. Connect to a working internet to continue"}
                />
            );
        }

        return (
            <RNWebView
                source={{ uri: url }}
                useWebKit
                originWhitelist={["https://*", "http://*", "tel:*", "mailto:*"]}
                renderError={this._renderError}
                renderLoading={this._renderLoadingIndicator}
                startInLoadingState
                javaScriptEnabled
                onShouldStartLoadWithRequest={this._handleLoadRequest}
            />
        );
    }

    @autobind
    private _renderError(errorDomain: string | undefined, errorCode: number, errorDesc: string): ReactElement {
        return (
            <ErrorState
                errorDomain={errorDomain}
                errorCode={errorCode}
                errorDesc={errorDesc}
            />
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
}
