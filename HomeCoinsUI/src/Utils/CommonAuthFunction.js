import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export const getStoredCookie = async () => {
    let cookie = null;
    try {
      const cookie = await AsyncStorage.getItem('cookie');
      return cookie;
    } catch (err) {
      showAlert("Async storage error",err);
      return cookie;
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
        const header ={
          headers:{ authorization:"Bearer " + value },
          withCredentials:true
        }
        return header;
      }catch(err){
        showAlert("Async storage error",err);
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

export const getLocalIP = async()=>{
  try{
    const data = await axios.get("https://api.ipify.org?format=json");
    return data.ip
  }catch(err){}
}