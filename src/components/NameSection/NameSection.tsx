import { EtymologyType, GeoLocationType } from "../../lib/dataManager/data";
import { fontFamily } from "../../lib/styles/styles";
import { StyleSheet, Text, View } from "react-native";
import Colours from "../../lib/colours/colours";
import React, { ReactElement } from "react";

const styles = StyleSheet.create({
    container:      { marginBottom: 24 },
    contentMeaning: {
        color:             Colours.GreyColour,
        fontSize:          16,
        paddingVertical:   4,
        textAlign:         "right",
        textAlignVertical: "center",
    },
    contentStyle: {
        color:             Colours.GreyColour,
        fontFamily,
        fontSize:          16,
        paddingLeft:       16,
        textAlignVertical: "center",
    },
    contentWrapper: {
        alignItems:     "center",
        flexDirection:  "row",
        justifyContent: "space-between",
    },
    noPadding:  { paddingHorizontal: 0 },
    titleStyle: {
        color:             Colours.GreyColour,
        fontFamily,
        fontSize:          20,
        fontWeight:        "bold",
        marginBottom:      8,
        textAlignVertical: "center",
    },
});

type ContentType = EtymologyType[] | string | GeoLocationType[] | string[];

interface NameSectionType {
    title: string;
    content: ContentType;
    onPress?: (url: string) => Promise<void>;
}

function isEtymology(content: ContentType): content is EtymologyType[] {
    // eslint-disable-next-line no-magic-numbers
    return !!content.length && (content as EtymologyType[])[0].part !== undefined;
}

function isGeoLocation(content: ContentType): content is GeoLocationType[] {
    // eslint-disable-next-line no-magic-numbers
    return !!content.length && (content as GeoLocationType[])[0].place !== undefined;
}

function getContent(content: ContentType, onPress?: (url: string) => Promise<void>): ReactElement[] | ReactElement {
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

    if (onPress && Array.isArray(content)) {
        return content.map((item, index) => {
            const onClick = () => onPress(item);
            return (
                <Text style={styles.contentStyle} onPress={onClick} key={index}>
                    {item}
                </Text>
            );
        });
    }

    return (
        <Text style={styles.contentStyle}>
            {content}
        </Text>
    );
}

export default function NameSection({ title, content, onPress }: NameSectionType): ReactElement {
    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>
                {title}
            </Text>
            {getContent(content, onPress)}
        </View>
    );
}
