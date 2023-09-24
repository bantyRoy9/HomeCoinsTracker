import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const getStoredCookie = async () => {
    try {
      const value = await AsyncStorage.getItem('cookie');
      return value;
    } catch (e) {
      showAlert("Async storage error");
    }
  };
  export const getAxiosHeaderWithoutCookie = async () => {
    try {
      const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      return header
    } catch (e) {
      showAlert("Async storage error");
    }
  };
export const getAxiosHeader = async()=>{
    
      try{
        const value = await AsyncStorage.getItem('cookie');
        header.headers = { authorization:"Bearer " + value };
        header.withCredentials=true
        return header;
      }catch(e){
        showAlert("Async storage error");
      }
};

export const showAlert = (firstMsg,secondMsg) =>{
Alert.alert(firstMsg,secondMsg,
  [
    {
      text: 'OK',
      onPress: () =>{return true},
      style: 'cancel',
    },
  ],
  {
    cancelable: true,
    onDismiss: () =>{return false},
  },
);
};