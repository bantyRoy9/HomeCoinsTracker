import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const getStoredCookie = async () => {
    try {
      const value = await AsyncStorage.getItem('cookie');
      return value;
    } catch (e) {
      Alert.alert("Async storage error",[{text:'OK',style:'cancel'}])
    }
  };

export const getAxiosHeader = async()=>{
    const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      try{
        const value = await AsyncStorage.getItem('cookie');
        header.headers = { authorization:"Bearer " + value };
        header.withCredentials=true
        console.log(header);
        return header;
      }catch(e){
        console.log(e);
        return header;
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