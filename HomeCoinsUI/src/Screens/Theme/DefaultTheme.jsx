import { DefaultTheme } from "react-native-paper"
export const defaultTheme ={
    ...DefaultTheme,
    dark:false,
    colors:{   
        ...DefaultTheme.colors,
        background:"rgb(255, 255, 255)",
        text:"rgb(10, 6, 26)",
        border:"#EEE",
        notification:"rgb(254, 103, 0)",
        card:"#EEE",
        btnBackground:"rgb(13, 245, 227)",
        inputFocusBackground:"rgb(255, 255, 255)",
        loaderColor:"rgb(56, 48, 76)",
        lightBackground:"#EEE"
    }
};
