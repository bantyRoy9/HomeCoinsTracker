import { DefaultTheme } from "react-native-paper"
export const defaultTheme ={
    ...DefaultTheme,
    dark:false,
    colors:{   
        ...DefaultTheme.colors,
        background:"rgb(255, 255, 255)",
        text:"rgb(10, 6, 26)",
        border:"rgb(77, 20, 137)",
        notification:"rgb(254, 103, 0)",
        card:"rgb(250, 240, 220)",
        btnBackground:"rgb(13, 245, 227)",
        inputFocusBackground:"rgb(255, 255, 255)",
    }
};
