import { DefaultTheme } from "react-native-paper"
export const defaultTheme ={
    ...DefaultTheme,
    dark:false,
    colors:{   
        ...DefaultTheme.colors,
        background:"rgb(255, 255, 255)",
        text:"rgb(10, 6, 26)",
        border:"rgb(238, 238, 238)",
        notification:"rgb(254, 103, 0)",
        card:"rgb(238, 238, 238)",
        HeaderBg:"rgb(1, 66, 131)",
        btnBackground:"rgb(1, 66, 131)",
        inputFocusBackground:"rgb(255, 255, 255)",
        loaderColor:"rgb(56, 48, 76)",
        lightBackground:"rgb(238, 238, 238)",
        surfaceVariant:"rgba(1, 66, 131,.1)"
    }
};

export const darkTheme = {
    ...DefaultTheme,
    dark:true,
    colors:{
        ...DefaultTheme.colors,
        background:"rgb(10, 6, 26)",
        secondary:"rgb(77, 20, 137)",
        border:"rgb(61, 61, 61)",
        text:"rgb(254, 254, 254)",
        notification:"rgb(254, 103, 0)",
        card:"rgb(40, 40, 40)",
        HeaderBg:"rgb(40, 40, 40)",
        surfaceVariant:"rgb(10, 6, 26)",
        btnBackground:"rgb(13, 245, 227)",
        headerBg:"rgb(31, 27, 36)",
        loaderColor:"rgb(255, 255, 255)",
        tableHeaderBackground:'rgb(0, 0, 0)',
        lightBackground:"rgb(31, 27, 36)"
    }
}
