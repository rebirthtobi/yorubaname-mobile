import { Platform } from "react-native";
import Colours from "../colours/colours";

export const fontFamily: string = Platform.select({
    android: "Roboto",
    ios:     "Avenir-Medium",
});

export const appearance = {
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
                elevation:       1,
            },
            ios: {
                shadowColor:  Colours.GreyColour,
                shadowOffset: {
                    height: 2,
                    width:  0,
                },
                shadowOpacity: 0.25,
                shadowRadius:  2,
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
