import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { validEmail, validMobile } from "./Regex";
import moment from "moment";

export const catchAsync = (asyncFunc) => {
  return (dispatch, errorType, ...args) => {
    asyncFunc(dispatch,errorType, ...args)
      .catch(err => {
        if (err.response && err.response.data) {
          showAlert(err.response.data.msg ?? err);
        }
        dispatch({ type: errorType, payload: null });
      });
  };
};

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
        withCredentials: true,
        crossDomain:true
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
        error[el] = `*${(el== 'source' || el== 'expendType')?'Select':'Enter'} ${el.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}`
      };
      if(el === "email" && !validEmail.test(details[el])){
        valid = false;
        error[el] = '*Please enter valid email'
      };
      if(el === "mobile" && !validMobile.test(details[el])){
        valid = false;
        error[el] = '*Please enter valid mobile no.';
      };
    });
  };
  return { valid, error };
};

export const handleReducerPayload = (currentState,prevState,methodType,key,value) =>{
  switch(methodType){
    // case "get":
    //   return;
    case "post":
      return [...prevState,currentState]
    case "patch": 
      return updateArrByIndex(prevState,key,currentState);
    case "delete":
      return removeElementByKey(prevState,key,currentState[key]);
    default:
      return currentState
  }
}

export const dateFormat = (format,date) =>{
  return moment(date?date:new Date()).format(format?format:"YYYY-MM-DD");
}
export const filterKeyIncludeArr=(arr,key,value)=>{
  return arr.filter(el=>el[key]===value);
};

export const getElementByIndex = (arr,indx,keyName) =>{
  let result="";
  if(arr && arr.length && arr[indx]) result = arr[indx];
  if(keyName) result=result[keyName]; 
  return result;
};

export const updateArrByIndex = (arr,key,newElement) =>{
  const index = arr.findIndex(el=>el[key] === newElement[key]);
  if(index !== -1){
    arr[index] = newElement;
  }
  return arr;
};

export const removeElementByKey = (arr,key,value) =>{
  return arr.filter(el=>el[key] !== value);
}