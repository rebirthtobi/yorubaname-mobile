import { appearance } from "../lib/styles/styles";
import {
    createAppContainer,
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator, createSwitchNavigator, NavigationRoute, NavigationScreenProp,
    TabBarIconProps,
} from "react-navigation";
import { Routes, TabIcons } from "./constants";
import { ViewStyle } from "react-native";
import AlphabetsScreen from "../screens/AlphabetsScreen/AlphabetsScreen";
import Colours from "../lib/colours/colours";
import CreditsScreen from "../screens/CreditsScreen/CreditsScreen";
import Icon from "react-native-vector-icons/Feather";
import NameListScreen from "../screens/NameListScreen/NameListScreen";
import NameScreen from "../screens/NameScreen/NameScreen";
import React from "react";
import SearchResultScreen from "../screens/SearchResultScreen/SearchResultScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import Sidebar from "./sidebar";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import SubmitNameScreen from "../screens/SubmitNameScreen/SubmitNameScreen";

const getTabIcon = (iconProps: TabBarIconProps, routeName: string): React.ReactElement<any> => {
    const { tintColor } = iconProps;
    const iconName: string = (TabIcons as any)[routeName];
    return <Icon name={iconName} color={tintColor || Colours.PrimaryColour} size={30} style={{ height: 34 }} />;
};

const SettingsNavigation = createDrawerNavigator({
    [Routes.Settings]: { screen: SettingsScreen },
    [Routes.Credits]:  { screen: CreditsScreen },
}, {
    contentComponent: Sidebar,
    drawerPosition:   "right",
    initialRouteName: Routes.Settings,
});

const TabMenuNavigation = createBottomTabNavigator({
    [Routes.Search]:   { screen: SearchScreen },
    [Routes.Alphabet]: {
        navigationOptions: (): {} => ({ title: "All Names" }),
        screen:            AlphabetsScreen,
    },
    [Routes.SettingsStack]: { screen: SettingsNavigation },
}, {
    defaultNavigationOptions: ({ navigation }: { navigation: NavigationScreenProp<NavigationRoute> }): object => {
        const { routeName } = navigation.state;
        return {
            tabBarIcon:    (iconProps: TabBarIconProps) => getTabIcon(iconProps, routeName),
            tabBarVisible: routeName !== Routes.Settings,
        };
    },
    initialRouteName: Routes.Search,
    tabBarOptions:    {
        activeBackgroundColor:   Colours.SecondaryColour,
        activeTintColor:         Colours.PrimaryColour,
        inactiveBackgroundColor: Colours.SecondaryColour,
        inactiveTintColor:       Colours.MutedColour,
        keyboardHidesTabBar:     true,
        labelStyle:              appearance.bottomTabLabel as ViewStyle,
        showIcon:                true,
        style:                   Object.assign(appearance.topShadow, appearance.bottomTabContainer),
    },
});

const AppNavigation = createStackNavigator({
    [Routes.TabStack]:     { screen: TabMenuNavigation },
    [Routes.SubmitName]:   { screen: SubmitNameScreen },
    [Routes.NameList]:     { screen: NameListScreen },
    [Routes.NameScreen]:   { screen: NameScreen },
    [Routes.SearchResult]: { screen: SearchResultScreen },
}, {
    headerMode:       "none",
    initialRouteName: Routes.TabStack,
});

const AppWithSplashNavigation = createSwitchNavigator({
    [Routes.Splash]:   { screen: SplashScreen },
    [Routes.AppStack]: { screen: AppNavigation },
}, {
    backBehavior:     "none",
    initialRouteName: Routes.Splash,
});

export default createAppContainer(AppWithSplashNavigation);
