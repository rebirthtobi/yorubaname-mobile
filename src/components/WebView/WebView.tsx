import { autobind } from "core-decorators";
import { WebView as RNWebView } from "react-native-webview";
import { WebViewNavigation } from "react-native-webview/lib/WebViewTypes";
import ErrorState from "../ErrorState/ErrorState";
import Loading from "../LoadingState/LoadingState";
import React, { Component, ReactElement } from "react";

interface WebViewProps {
    url: string;
}

export default class WebView extends Component<WebViewProps> {
    render() {
        const { url } = this.props;

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
    public _renderError(errorDomain: string | undefined, errorCode: number, errorDesc: string): ReactElement {
        return (
            <ErrorState
                errorDomain={errorDomain}
                errorCode={errorCode}
                errorDesc={errorDesc}
            />
        );
    }

    @autobind
    public _renderLoadingIndicator(): ReactElement {
        return <Loading />;
    }

    @autobind
    private _handleLoadRequest(request: WebViewNavigation): boolean {
        const { url } = request;
        const { url: propsUrl } = this.props;
        return url === propsUrl;
    }
}
