import { DefaultTheme } from "react-native-paper"
export const defaultTheme ={
    ...DefaultTheme,
    dark:false,
    colors:{   
        ...DefaultTheme.colors,
        background:"rgb(255, 255, 255)",
        text:"rgb(10, 6, 26)",
        border:"rgba(1, 66, 131,.1)",
        notification:"rgb(254, 103, 0)",
        card:"rgba(1, 66, 131,.1)",
        HeaderBg:"rgb(1, 66, 131)",
        HeaderText:"rgb(254, 254, 254)",

        btnPrimaryBackground:"rgb(1, 66, 131)",
        btnSecondaryBackground:"rgba(1, 66, 131,.1)",
        btnPrimaryColor:"rgb(255, 255, 255)",
        btnSecondaryColor:"rgb(1, 1, 1)",
        
        success:"rgb(34, 119, 0)",
        warning:"rgb(159, 96, 0)",
        inputFocusBackground:"rgb(255, 255, 255)",
        loaderColor:"rgb(254, 254, 254)",
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
        HeaderText:"rgb(254, 254, 254)",
        surfaceVariant:"rgb(10, 6, 26)",
        btnBackground:"rgb(13, 245, 227)",
        headerBg:"rgb(31, 27, 36)",
        loaderColor:"rgb(255, 255, 255)",
        tableHeaderBackground:'rgb(0, 0, 0)',
        lightBackground:"rgb(31, 27, 36)"
    }
}
