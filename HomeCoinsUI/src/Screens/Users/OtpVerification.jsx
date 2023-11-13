import { StyleSheet, Text, View, Pressable, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Input } from '../../Components'
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, TextInput, useTheme } from 'react-native-paper';
import { showAlert, updateErrors, validateForm } from '../../Utils/CommonAuthFunction';
import { defaultStyle } from '../../Utils';
import { verifyUserOTP } from '../../Redux/Action/userAction';
//{ navigation, route: { params: { emailAddress } } }
const OtpVerification = () => {
  const [detail, setDetail] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { colors, dark } = useTheme();
  const { isLoading,user } = useSelector(state => state.user);
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
        dispatch(verifyUserOTP(OTP,{email:user?.email}));
      }
    } catch (err) {
      showAlert(err);
    }
  }
  const btnStyle = {
    backgroundColor: colors.btnBackground,
    color: colors.text
  };
  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const forthRef = useRef();
  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <View style={{ ...defaultStyle.screenContainer, flex: 1 }}>
        <View style={styles.otpHeading}>
          <Text style={[styles.textBold, backgroundStyle]} >OTP Verification</Text>
          <Text style={[styles.textBold, backgroundStyle]}>Enter the OTP number just sent you at <Text style={{ ...styles.textEmail, color: btnStyle.backgroundColor }}>{user?.email}</Text></Text>
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
          <Text style={{ ...styles.text, ...btnStyle.color }}>{isLoading ? <ActivityIndicator size={'small'} color={colors.text}/> : "VERIFY"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
export default OtpVerification
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    marginVertical: 15
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