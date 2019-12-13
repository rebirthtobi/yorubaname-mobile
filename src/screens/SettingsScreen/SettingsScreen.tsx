import { autobind } from "core-decorators";
import {
    FlatList, Linking, StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import {isError} from "tslint/lib/error";
import { fontFamily } from "../../lib/styles/styles";
import { NavigationScreenProps } from "react-navigation";
import { Routes } from "../../navigation/constants";
import Colours from "../../lib/colours/colours";
import DataManager from "../../lib/dataManager/dataManager";
import getTranslatedText from "../../lib/localization/getTranslatedText";
import Icon from "react-native-vector-icons/Feather";
import React, { Component, ReactElement } from "react";
import Toast from "react-native-root-toast";
import Urls from "../../lib/urls/urls";
import withBottomNavigation from "../../components/withBottomNavigation/withBottomNavigation";
import withSafeAreaView from "../../components/withSafeAreaView/withSafeAreaView";

const styles = StyleSheet.create({
    itemSeparatorStyle: {
        backgroundColor: Colours.PrimaryColour,
        height:          0.5,
    },
    listItemContainer: {
        alignItems:        "center",
        flexDirection:     "row",
        justifyContent:    "space-between",
        paddingHorizontal: 16,
        paddingVertical:   16,
    },
    listItemStyle: {
        color:    Colours.GreyColour,
        fontFamily,
        fontSize: 20,
    },
});

interface SettingsDataType {
    id: number;
    icon: string;
    isExternalLink?: boolean;
    name: string;
    onPress?: () => Promise<boolean>;
    route?: string;
    url?: string;
}

const data: SettingsDataType[] = [
    {
        icon:    "chevrons-down",
        id:      1,
        name:    "Update Database",
        onPress: DataManager.refreshNamesDb,
        route:   Routes.About,
    },
    {
        icon:           "triangle",
        id:             2,
        isExternalLink: true,
        name:           "About",
        url:            Urls.About,
    },
    {
        icon:           "gift",
        id:             3,
        isExternalLink: true,
        name:           "Donate",
        url:            Urls.Donate,
    },
    {
        icon:           "minimize",
        id:             4,
        isExternalLink: true,
        name:           "Volunteer",
        url:            Urls.Volunteer,
    },
    {
        icon:           "edit-3",
        id:             5,
        isExternalLink: true,
        name:           "Blog",
        url:            Urls.Blog,
    },
    {
        icon:  "award",
        id:    6,
        name:  "Credits",
        route: Routes.Credits,
    },
    {
        icon:           "shield",
        id:             7,
        isExternalLink: true,
        name:           "Privacy Policy",
        url:            Urls.PrivacyPolicy,
    },
];

class SettingsScreen extends Component<NavigationScreenProps> {
    render() {
        return (
            <FlatList
                data={data}
                ItemSeparatorComponent={this._getItemSeparator}
                renderItem={this._getItemComponent}
                keyExtractor={this._getItemKey}
            />
        );
    }

    @autobind
    private _getItemKey(item: SettingsDataType, index: number): string {
        return `${item.id}${index}`;
    }

    @autobind
    private _getItemSeparator(): ReactElement {
        return <View style={styles.itemSeparatorStyle}/>;
    }

    @autobind
    // tslint:disable:jsx-no-lambda
    private _getItemComponent({ item }: {item: SettingsDataType}): ReactElement {
        return (
            <TouchableOpacity
                onPress={() => this._handleItemClick(item)}
            >
                <View style={styles.listItemContainer}>
                    <Text
                        style={styles.listItemStyle}
                    >
                        {item.name}
                    </Text>
                    <Icon
                        name={item.icon}
                        size={20}
                        color={Colours.PrimaryColour}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    @autobind
    private async _handleItemClick(item: SettingsDataType) {
        if (item.onPress) {
            Toast.show(getTranslatedText("Updating Name Database"), {
                animation:   true,
                duration:    Toast.durations.SHORT,
                hideOnPress: false,
                position:    Toast.positions.BOTTOM,
                shadow:      true,
            });
            await this._updateNames(item.onPress!);
        } else if (item.isExternalLink && item.url) {
            await Linking.canOpenURL(item.url).then(
                async isSupported => {
                    if (isSupported) {
                        await Linking.openURL(item.url!);
                    }
                }
            );
        } else if (item.route) {
            const { navigation } = this.props;
            navigation.navigate(item.route);
        }
    }

    @autobind
    private async _updateNames(updateNames: () => Promise<boolean>): Promise<void> {
        const isNamesUpdated = await updateNames();
        if (isNamesUpdated) {
            Toast.show(getTranslatedText("Updating of Name Database Successful"), {
                animation:   true,
                duration:    Toast.durations.SHORT,
                hideOnPress: false,
                position:    Toast.positions.BOTTOM,
                shadow:      true,
            });
        } else {
            Toast.show(getTranslatedText("Updating of Name Database Fail"), {
                animation:   true,
                duration:    Toast.durations.SHORT,
                hideOnPress: false,
                position:    Toast.positions.BOTTOM,
                shadow:      true,
            });
        }
    }
}

export default withSafeAreaView(withBottomNavigation(SettingsScreen));
