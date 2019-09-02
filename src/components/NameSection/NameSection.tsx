import { EtymologyType, GeoLocationType } from "../../lib/dataManager/data";
import { StyleSheet, Text, View } from "react-native";
import Colours from "../../lib/colours/colours";
import React, { ReactElement } from "react";

const styles = StyleSheet.create({
    contentMeaning: {
        color:             Colours.GreyColour,
        fontSize:          20,
        paddingVertical:   4,
        textAlign:         "right",
        textAlignVertical: "center",
    },
    contentStyle: {
        color:             Colours.GreyColour,
        fontSize:          20,
        paddingHorizontal: 16,
        paddingVertical:   4,
        textAlignVertical: "center",
    },
    contentWrapper: {
        alignItems:        "center",
        flexDirection:     "row",
        justifyContent:    "space-between",
        paddingHorizontal: 16,
    },
    noPadding:  { paddingHorizontal: 0 },
    titleStyle: {
        backgroundColor:   Colours.PrimaryColour,
        color:             Colours.SecondaryColour,
        fontSize:          16,
        paddingHorizontal: 16,
        paddingVertical:   8,
        textAlign:         "right",
        textAlignVertical: "center",
    },
});

type ContentType = EtymologyType[] | string | GeoLocationType[];

interface NameSectionType {
    title: string;
    content: ContentType;
    onPress?: () => Promise<void>;
}

function isEtymology(content: ContentType): content is EtymologyType[] {
    // eslint-disable-next-line no-magic-numbers
    return !!content.length && (content as EtymologyType[])[0].part !== undefined;
}

function isGeoLocation(content: ContentType): content is GeoLocationType[] {
    // eslint-disable-next-line no-magic-numbers
    return !!content.length && (content as GeoLocationType[])[0].place !== undefined;
}

function getContent(content: ContentType, onPress?: () => Promise<void>): ReactElement[] | ReactElement {
    if (isEtymology(content)) {
        return content.map((item, index) => (
            <View style={styles.contentWrapper} key={index}>
                <Text style={[styles.contentStyle, styles.noPadding]}>{item.part}</Text>
                <Text style={styles.contentMeaning}>{item.meaning}</Text>
            </View>
        ));
    }

    if (isGeoLocation(content)) {
        return (
            <Text style={styles.contentStyle}>
                {content.map(item => item.place).join(", ")}
            </Text>
        );
    }

    return (
        <Text style={styles.contentStyle} onPress={onPress}>
            {content}
        </Text>
    );
}

export default function NameSection({ title, content, onPress }: NameSectionType): ReactElement {
    return (
        <View>
            <Text style={styles.titleStyle}>
                {title}
            </Text>
            {getContent(content, onPress)}
        </View>
    );
}
