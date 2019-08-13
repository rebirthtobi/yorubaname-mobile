import { NavigationScreenProps } from "react-navigation";
import React, { Component } from "react";
import Urls from "../../lib/urls/urls";
import WebView from "../../components/WebView/WebView";
import withBottomNavigation from "../../components/withBottomNavigation/withBottomNavigation";

class AboutScreen extends Component<NavigationScreenProps> {
    render() {
        return (
            <WebView
                url={Urls.About}
            />
        );
    }
}

export default withBottomNavigation(AboutScreen);
