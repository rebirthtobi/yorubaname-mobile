import React, { Component } from "react";
import Urls from "../../lib/urls/urls";
import WebView from "../../components/WebView/WebView";
import withSafeAreaView from "../../components/withSafeAreaView/withSafeAreaView";

class BlogScreen extends Component {
    render() {
        return (
            <WebView
                url={Urls.Blog}
                canNavigateInWebView
            />
        );
    }
}

export default BlogScreen;
