import { NavigationScreenProps } from "react-navigation";
import React, { Component } from "react";
import Urls from "../../lib/urls/urls";
import WebView from "../../components/WebView/WebView";
import withBottomNavigation from "../../components/withBottomNavigation/withBottomNavigation";
import withSafeAreaView from "../../components/withSafeAreaView/withSafeAreaView";

class AboutScreen extends Component<NavigationScreenProps> {
    render() {
        return (
            <WebView
                url={Urls.About}
            />
        );
    }
}

export default withSafeAreaView(withBottomNavigation(AboutScreen));
