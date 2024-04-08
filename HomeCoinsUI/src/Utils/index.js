import { lightColorProps,darkColorProps } from "./colorProp";
import { defaultStyle } from "./defaultCss";
import { homeNavList,topHomeNavList,bottomHeaderList,profileNavList } from "./NavigationList";
import { accountControllerURL,activityControllerURL,userControllerURL } from "./URLProperties";
import { FontAwesome, FontAwesome5,AntDesign,Ionicons,FeatherIcons,MaterialCommunityIcons,MaterialIcon} from './VectorIcons';
import { stringTransform } from "./HomeCommon";
import { updateErrors,validateForm,getAxiosHeader,getAxiosHeaderWithoutCookie,getLocalIP,getStoredCookie } from "./CommonAuthFunction";
export { 
        lightColorProps,darkColorProps,defaultStyle,homeNavList,accountControllerURL,activityControllerURL,userControllerURL,topHomeNavList,bottomHeaderList,profileNavList,
        updateErrors,validateForm,getAxiosHeader,getAxiosHeaderWithoutCookie,getLocalIP,getStoredCookie,
        FeatherIcons,FontAwesome,FontAwesome5,AntDesign,Ionicons,MaterialCommunityIcons,MaterialIcon,
        stringTransform
    }