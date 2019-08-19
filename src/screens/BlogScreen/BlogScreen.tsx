import React, { Component } from "react";
import Urls from "../../lib/urls/urls";
import WebView from "../../components/WebView/WebView";

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
