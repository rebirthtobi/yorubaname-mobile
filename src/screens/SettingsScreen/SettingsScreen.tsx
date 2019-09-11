import { autobind } from "core-decorators";
import {
    FlatList, StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Routes } from "../../navigation/constants";
import Colours from "../../lib/colours/colours";
import DataManager from "../../lib/dataManager/dataManager";
import getTranslatedText from "../../lib/localization/getTranslatedText";
import Icon from "react-native-vector-icons/Feather";
import React, { Component, ReactElement } from "react";
import Toast from "react-native-root-toast";
import withBottomNavigation from "../../components/withBottomNavigation/withBottomNavigation";

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
        paddingVertical:   12,
    },
    listItemStyle: {
        color:    Colours.GreyColour,
        fontSize: 18,
    },
});

interface SettingsDataType {
    id: number;
    icon: string;
    name: string;
    onPress?: () => Promise<boolean>;
    route?: string;
}

const data: SettingsDataType[] = [
    {
        icon:    "chevrons-down",
        id:      1,
        name:    "Update Database",
        onPress: DataManager.refreshNamesDb,
    },
    {
        icon:  "triangle",
        id:    2,
        name:  "About",
        route: Routes.About,
    },
    {
        icon:  "gift",
        id:    3,
        name:  "Donate",
        route: Routes.Donate,
    },
    {
        icon:  "minimize",
        id:    4,
        name:  "Volunteer",
        route: Routes.Volunteer,
    },
    {
        icon:  "award",
        id:    5,
        name:  "Credits",
        route: Routes.Credits,
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
                        color={Colours.GreyColour}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    @autobind
    private _handleItemClick(item: SettingsDataType) {
        if (item.onPress) {
            Toast.show(getTranslatedText("Updating Name Database"), {
                animation:   true,
                duration:    Toast.durations.SHORT,
                hideOnPress: false,
                onHidden:    () => this._updateNames(item.onPress!),
                position:    Toast.positions.BOTTOM,
                shadow:      true,
            });
        } else {
            const { navigation } = this.props;
            navigation.navigate(Routes.Credits);
        }
    }

    @autobind
    private async _updateNames(updateNames: () => Promise<boolean>): Promise<void> {
        const isNamesUpdated = await updateNames();
        if (isNamesUpdated) {
                Toast.show(getTranslatedText("Updating of Name Database Successful"), {
                animation:   true,
                duration:    Toast.durations.LONG,
                hideOnPress: false,
                position:    Toast.positions.BOTTOM,
                shadow:      true,
            });
        } else {
            Toast.show(getTranslatedText("Updating of Name Database Fail"), {
                animation:   true,
                duration:    Toast.durations.LONG,
                hideOnPress: false,
                position:    Toast.positions.BOTTOM,
                shadow:      true,
            });
        }
    }
}

export default withBottomNavigation(SettingsScreen);
