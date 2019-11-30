import { Platform } from "react-native";
import Colours from "../colours/colours";

export const fontFamily: string = Platform.select({
    android: "Roboto",
    ios:     "Avenir-Medium",
});

export const appearance = {
    bottomShadow: {
        ...Platform.select({
            android: {
                backgroundColor: Colours.PrimaryColour,
                elevation:       4,
            },
            ios: {
                shadowColor:  Colours.PrimaryColour,
                shadowOffset: {
                    height: 3,
                    width:  0,
                },
                shadowOpacity: 0.25,
                shadowRadius:  1,
            },
        }),
    },
    bottomTabContainer: {
        borderTopWidth:  0,
        paddingVertical: 8,
    },
    bottomTabLabel: {
        color:      Colours.GreyColour,
        fontFamily,
        fontSize:   12,
        fontWeight: "bold",
    },
    shadow: {
        ...Platform.select({
            android: {
                backgroundColor: Colours.GreyColour,
                elevation:       2,
            },
            ios: {
                shadowColor:  Colours.GreyColour,
                shadowOffset: {
                    height: 1,
                    width:  0,
                },
                shadowOpacity: 0.5,
                shadowRadius:  3,
            },
        }),
    },
    topShadow: {
        ...Platform.select({
            android: {
                backgroundColor: Colours.GreyColour,
                elevation:       4,
            },
            ios: {
                shadowColor:  Colours.GreyColour,
                shadowOffset: {
                    height: -3,
                    width:  0,
                },
                shadowOpacity: 0.25,
                shadowRadius:  1,
            },
        }),
    },
};
