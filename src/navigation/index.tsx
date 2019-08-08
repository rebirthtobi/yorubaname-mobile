import {
    createAppContainer,
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator, NavigationRoute, NavigationScreenProp,
    TabBarIconProps,
} from "react-navigation";
import { Routes, TabIcons } from "./constants";
import AboutScreen from "../screens/AboutScreen/AboutScreen";
import BlogScreen from "../screens/BlogScreen/BlogScreen";
import Colours from "../lib/colours/colours";
import CreditsScreen from "../screens/CreditsScreen/CreditsScreen";
import DonateScreen from "../screens/DonateScreen/DonateScreen";
import Icon from "react-native-vector-icons/Feather";
import NameListScreen from "../screens/NameListScreen/NameListScreen";
import React from "react";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import SubmitNameScreen from "../screens/SubmitNameScreen/SubmitNameScreen";
import VolunteerScreen from "../screens/VolunteerScreen/VolunteerScreen";

const getTabIcon = (iconProps: TabBarIconProps, routeName: string): React.ReactElement<any> => {
    const { tintColor } = iconProps;
    const iconName: string = (TabIcons as any)[routeName];
    return <Icon name={iconName} color={tintColor || Colours.primaryColour} size={25}/>;
};

const AboutNavigation = createDrawerNavigator({
    [Routes.About]:     { screen: AboutScreen },
    [Routes.Donate]:    { screen: DonateScreen },
    [Routes.Volunteer]: { screen: VolunteerScreen },
    [Routes.Credits]:   { screen: CreditsScreen },
}, {
    drawerPosition:   "right",
    initialRouteName: Routes.About,
});

const TabMenuNavigation = createBottomTabNavigator({
    [Routes.Search]:     { screen: SearchScreen },
    [Routes.NameList]:   { screen: NameListScreen },
    [Routes.Blog]:       { screen: BlogScreen },
    [Routes.AboutStack]: { screen: AboutNavigation },
}, {
    defaultNavigationOptions: ({ navigation }: { navigation: NavigationScreenProp<NavigationRoute> }): object => {
        const { routeName } = navigation.state;
        return {
            tabBarIcon:    (iconProps: TabBarIconProps) => getTabIcon(iconProps, routeName),
            tabBarVisible: routeName !== Routes.About,
        };
    },
    initialRouteName: Routes.Search,
    tabBarOptions:    {
        activeBackgroundColor:   Colours.secondaryColour,
        activeTintColor:         Colours.primaryColour,
        inactiveBackgroundColor: Colours.primaryColour,
        inactiveTintColor:       Colours.secondaryColour,
        labelStyle:              { fontSize: 16 },
        showIcon:                true,
        style:                   { borderTopWidth: 0 },
    },
});

const AppNavigation = createStackNavigator({
    [Routes.TabStack]:   { screen: TabMenuNavigation },
    [Routes.SubmitName]: { screen: SubmitNameScreen },
}, {
    headerMode:       "none",
    initialRouteName: Routes.TabStack,
});

export default createAppContainer(AppNavigation);
