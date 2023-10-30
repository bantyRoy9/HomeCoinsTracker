import { StyleSheet, Text, View, Pressable, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useRef } from 'react'
import { Input } from '../../Components'
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { showAlert, updateErrors, validateForm } from '../../Utils/CommonAuthFunction';
import { defaultStyle } from '../../Utils';

const OtpVerification = ({ navigation, route: { params: { emailAddress } } }) => {
  const [detail, setDetail] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { colors, dark } = useTheme();
  const { isLoading, user, isAuthenticated } = useSelector(state => state.user);

  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text
  }
  const changeHandler = (key, value) => {
    updateErrors(errors, key);
    setDetail({ ...detail, [key]: value });
  };
console.log(detail);
  const submitHandler = () => {
    try {
      const validation = validateForm(detail);
      setErrors(validation.error);
      if (validation.valid) {
        dispatch(createGroupAndRequest(detail, fields == "email" ? user.id : ""));
      }
    } catch (err) {
      showAlert(err);
    }
  }
  const btnStyle = {
    backgroundColor: colors.btnBackground,
    color: colors.text
  };
  const first = useRef();
  const second = useRef();
  const third = useRef();
  const forth = useRef();
  const otpLeng = [ first, second,third,forth]
  const otpRef =[]
  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <View style={{...defaultStyle.screenContainer,flex:1}}>
        <View style={styles.otpHeading}>
          <Text style={[styles.textBold,backgroundStyle]} >OTP Verification</Text>
          <Text style={[styles.textBold,backgroundStyle]}>Enter the OTP number just sent you at <Text style={styles.textEmail}>{emailAddress}</Text></Text>
          
        </View>
        <View style={{ flexDirection: 'row', gap: 10, width: '100%', justifyContent: 'space-evenly' }}>
          {otpLeng.map((el,idx) => (
              <Input
                isLabel={false}
                name={"Otp"}
                style={{ backgroundColor: colors.card}}
                value={detail.name}
                autoFocus={false}
                keyboardType={"number-pad"}
                maxLength={1}
                ref={otpLeng[idx]}
                onChangeText={(text) => {
                  changeHandler(idx, text);
                }}
                isHelper={errors.otp ? true : false}
                errorMsg={errors.otp}
                helperType={'error'}
              />
          ))}

        </View>
        <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler} >
          <Text style={{ ...styles.text, ...btnStyle.color }}>{"Verify"}</Text>
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
  otpHeading:{
    marginVertical:40,
    gap:10
  },
  textEmail:{
    fontSize:20,
    fontWeight:'normal',
    color:'#3d3d3d'
  },
  textBold:{
    fontSize:25,
    fontWeight:'bold'
  }
})