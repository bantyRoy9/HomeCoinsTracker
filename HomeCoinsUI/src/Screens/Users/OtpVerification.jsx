import { StyleSheet, Text, View, Pressable, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, TextInput, useTheme } from 'react-native-paper';
import { getAxiosHeader, showAlert, updateErrors, validateForm } from '../../Utils/CommonAuthFunction';
import { defaultStyle, userControllerURL } from '../../Utils';
import { verifyForgotPasswordOTP, verifyUserOTP } from '../../Redux/Action/userAction';
import axios from 'axios';

const OtpVerification = ({ navigation, route: { params: { email ,isForgetPassword} } }) => {
  const [detail, setDetail] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { colors, dark } = useTheme();
  const { isLoading } = useSelector(state => state.user);
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text
  };
  const changeHandler = (key, value) => {
    updateErrors(errors, key);
    setDetail({ ...detail, [key]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const validation = validateForm(detail);
      setErrors(validation.error);
      if (validation.valid) {
        let OTP = Object.values(detail).join('')
        isForgetPassword?verifyForgotPasswordOTP(OTP,navigation):dispatch(verifyUserOTP(OTP,{email},navigation,isForgetPassword));
      }
    } catch (err) {
      showAlert(err);
    }
  };
  const resendOTPBtn = async() =>{
    try{
      const { data } = await axios.post(`${userControllerURL}/sendOTP`,{email},await getAxiosHeader());
      if(data && data.status){
        showAlert(data?.msg);
      };
    }catch(err){
      showAlert(err)
    }
  };
  const btnStyle = {
    backgroundColor: colors.btnBackground,
    color: colors.text
  };
  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const forthRef = useRef();
  return (
      <View style={{ ...defaultStyle.screenContainer, flex: 1 }}>
        <View style={styles.otpHeading}>
          <Text style={[styles.textBold, backgroundStyle]} >OTP Verification</Text>
          <Text style={[styles.textBold, backgroundStyle]}>Enter the OTP number just sent you at <Text style={{ ...styles.textEmail, color: btnStyle.backgroundColor }}>{email}</Text></Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, width: '100%', justifyContent: 'space-evenly' }}>
          <TextInput
            ref={firstRef}
            underlineColor={errors["1"] ? colors.error : colors.card}
            style={{ backgroundColor: colors.card,borderColor:'red', fontSize: 25 }}
            contentStyle={{ textAlign: 'center' }}
            textColor={btnStyle.backgroundColor}
            textAlign='center'
            autoFocus={true}
            keyboardType={"number-pad"}
            maxLength={1}
            onChangeText={(text) => {
              text && secondRef.current.focus()
              changeHandler("1",text);
            }}
          />
          <TextInput
            ref={secondRef}
            underlineColor={errors["2"] ? colors.error : colors.card}
            style={{ backgroundColor: colors.card, fontSize: 25 }}
            contentStyle={{ textAlign: 'center' }}
            textColor={btnStyle.backgroundColor}
            keyboardType={"number-pad"}
            maxLength={1}
            onChangeText={(text) => {
              text ? thirdRef.current.focus() : firstRef.current.focus();
              changeHandler("2",text);
            }}
          />
          <TextInput
            ref={thirdRef}
            underlineColor={errors["3"] ? colors.error : colors.card}
            style={{ backgroundColor: colors.card, fontSize: 25 }}
            contentStyle={{ textAlign: "center" }}
            textColor={btnStyle.backgroundColor}
            keyboardType={"number-pad"}
            maxLength={1}
            onChangeText={(text) => {
              text ? forthRef.current.focus() : secondRef.current.focus();
              changeHandler("3",text);
            }}
          />
          <TextInput
            ref={forthRef}
            underlineColor={errors["4"] ? colors.error : colors.card}
            style={{ backgroundColor: colors.card, fontSize: 25 }}
            contentStyle={{ textAlign: "center"}}
            textColor={btnStyle.backgroundColor}
            keyboardType={"number-pad"}
            maxLength={1}
            onChangeText={(text) => {
              !text && thirdRef.current.focus();
              changeHandler("4",text);
            }}
          />
        </View>
        <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler} >
          <Text style={styles.text}>{isLoading ? <ActivityIndicator size={'small'} color={colors.text}/> : "VERIFY"}</Text>
        </Pressable>
        <Pressable style={{ ...styles.resendBtn }} onPress={resendOTPBtn}>
          <Text style={{ ...styles.text,borderBottomWidth:1,borderBottomColor:btnStyle.backgroundColor,color:btnStyle.backgroundColor }}>Resend OTP</Text>
        </Pressable>
      </View>
  )
}
export default OtpVerification
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    marginVertical: 20
  },
  resendBtn:{
    alignItems: 'center',
    paddingVertical: 0,
    marginVertical: 10
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  otpHeading: {
    marginVertical: 40,
    gap: 10
  },
  textEmail: {
    fontSize: 18,
    fontWeight: 'normal'
  },
  textBold: {
    fontSize: 25,
    fontWeight: 'bold'
  }
})