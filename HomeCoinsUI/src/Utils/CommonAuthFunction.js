import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export const getStoredCookie = async () => {
  let cookie = null;
  try {
    const cookie = await AsyncStorage.getItem('cookie');
    return cookie;
  } catch (err) {
    showAlert("Async storage error", err);
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
export const getAxiosHeader = async () => {
  try {
    const value = await AsyncStorage.getItem('cookie');
    let header = null;
    if (value) {
      header = {
        headers: { authorization: "Bearer " + value },
        withCredentials: true
      }
    }
    return header;
  } catch (err) {
    showAlert("Async storage error", err);
  }
};

export const showAlert = (firstMsg, secondMsg) => {
  return Alert.alert(firstMsg, secondMsg,
    [
      {
        text: 'OK',
        onPress: () => { return true },
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () => { return false },
    },
  );
};

export const getLocalIP = async () => {
  try {
    const data = await axios.get("https://api.ipify.org?format=json");
    return data.ip
  } catch (err) { }
};

export const updateErrors = (errors, key) => {
  if (errors[key]) {
    delete errors[key]
  };
  return errors;
};

export const validateForm = (details) => {
  let valid = true, error = {};
  if (details && Object.keys(details).length > 0) {
    Object.keys(details).forEach((el, idx) => {
      if (!details[el]) {
        valid = false;
        error[el] = `*Enter ${el.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}`
      };
    });
  };
  return { valid, error };
};
