import { DefaultTheme } from "react-native-paper"
export const darkTheme = {
    ...DefaultTheme,
    dark:true,
    colors:{
        ...DefaultTheme.colors,
        background:"rgb(10, 6, 26)",
        secondary:"rgb(77, 20, 137)",
        border:"#3d3d3d3d",
        text:"rgb(254, 254, 254)",
        notification:"rgb(254, 103, 0)",
        card:"rgb(40, 40, 40)",
        surfaceVariant:"rgb(10, 6, 26)",
        btnBackground:"rgb(13, 245, 227)",
        headerBg:"rgb(31, 27, 36)"
    }
}