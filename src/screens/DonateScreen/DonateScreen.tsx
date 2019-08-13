import { NavigationScreenProps } from "react-navigation";
import React, { Component } from "react";
import Urls from "../../lib/urls/urls";
import WebView from "../../components/WebView/WebView";
import withBottomNavigation from "../../components/withBottomNavigation/withBottomNavigation";

class DonateScreen extends Component<NavigationScreenProps> {
    render() {
        return (
            <WebView
                url={Urls.Donate}
            />
        );
    }
}

export default withBottomNavigation(DonateScreen);
