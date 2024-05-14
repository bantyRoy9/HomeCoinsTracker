import { StatusBar,Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import Input from '../../Components/Input';
import Icons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import { createUser, forgotPassword, verifyForgotPasswordOTP } from '../../Redux/Action/userAction';
import { showAlert, updateErrors, validateForm } from '../../Utils/CommonAuthFunction';
import { useTheme } from 'react-native-paper';
import Button from '../../Components/Button';

const Signup = ({ navigation,route: { params :{ isForgotPassword,isOTPVerified,OTP}}}) => {
  const dispatch = useDispatch();
  const { colors, dark } = useTheme();
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState((isForgotPassword && !isOTPVerified)?{email:""}:(isOTPVerified && isForgotPassword)?{password: "", confirmPassword: ""}:{ name: "",mobile:"", email: "", password: "", confirmPassword: "" });
  const { isLoading } = useSelector(state=>state.user);
  const [passwordPressIn,setPasswordPressOut] = useState(false)
  const rightIconHandler = () =>{
    setPasswordPressOut(prev=>!prev);
  }

  const backgroundStyle = {backgroundColor: colors.background,color: colors.text};
  const btnStyle = {backgroundColor: colors.btnBackground,color: colors.btnBackground};
  
  const changeHandler = (key, value) => {
    updateErrors(errors, key);
    setUser({ ...user, [key]: value })
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let validation = validateForm(user);
    if(user?.confirmPassword !== user?.password){
      validation.valid=false;
      validation.error.confirmPassword = "Password and confirm password should be match."
    };
    setErrors(validation.error);
    if (validation.valid) {
      try {
        if(isForgotPassword && isOTPVerified){
          verifyForgotPasswordOTP(OTP,navigation,{password:user.password,confirmPassword:user.confirmPassword}) 
        }else{
          dispatch((isForgotPassword && !isOTPVerified)?forgotPassword(user,navigation) : createUser(user,navigation));
        };
      } catch (err) {
          showAlert(err);
      };
    }
  };
  return (
        <View style={styles.signupContainer}>
          <View style={styles.arrowBack}>
            <Icons name='arrow-back' size={30} onPress={() => navigation.navigate('Login')} color={colors.text} />
          </View>
          <View style={styles.pageTitle}>
            <Text style={{ ...styles.headerTitle, color: colors.text }}>{(isForgotPassword && !isOTPVerified)?"Forgot Password":(isForgotPassword && isOTPVerified)?"Reset Password":"Create Account"}</Text>
            <Text style={{ ...styles.subHeaderTitle, color: colors.text }}>Please fill the details below here</Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {(isForgotPassword && !isOTPVerified) ? <>
              <View pointerEvents={isLoading ? "none" : "auto"}>
              <Input
                placeholder={"Enter your email address"}
                label={"Enter your email address"}
                isLabel={false}
                name={'email'}
                icons={'envelope'}
                value={user.email}
                secureTextEntry={false}
                autoFocus={false}
                onChangeText={(text) => changeHandler("email", text)}
                isHelper={errors.email ? true : false}
                errorMsg={errors?.email}
                helperType={'error'}
              />
              </View>
            </>
            : (isForgotPassword && isOTPVerified) ? <>
            <View pointerEvents={isLoading ? "none" : "auto"}>
              <Input
                placeholder={"Password"}
                label={"Password"}
                isLabel={false}
                name={'password'}
                icons={'lock'}
                value={user.password}
                secureTextEntry={true}
                autoFocus={false}
                onChangeText={(text) => changeHandler("password", text)}
                isHelper={errors.password ? true : false}
                errorMsg={errors?.password}
                helperType={'error'}
              />
            </View>
            <View pointerEvents={isLoading ? "none" : "auto"}>
              <Input
                placeholder={"Confirm Password"}
                label={"Confirm Password"}
                isLabel={false}
                name={'confirmPassword'}
                icons={'lock'}
                value={user.confirmPassword}
                secureTextEntry={true}
                autoFocus={false}
                onChangeText={(text) => changeHandler("confirmPassword", text)}
                isHelper={errors.confirmPassword ? true : false}
                errorMsg={errors?.confirmPassword}
                helperType={'error'}
              />
            </View>
            </> 
            :
            <><View pointerEvents={isLoading ? "none" : "auto"}>
              <Input
                placeholder={"Full Name"}
                label={"Full Name"}
                isLabel={false}
                name={'name'}
                icons={'user'}
                value={user.name}
                secureTextEntry={false}
                autoFocus={false}
                onChangeText={(text) => changeHandler("name", text)}
                isHelper={errors.name ? true : false}
                errorMsg={errors?.name}
                helperType={'error'}
              />
            </View>
            <View pointerEvents={isLoading ? "none" : "auto"}>
              <Input
                placeholder={"Mobile"}
                label={"Moble"}
                isLabel={false}
                name={'mobile'}
                icons={'mobile'}
                value={user.mobile}
                secureTextEntry={false}
                autoFocus={false}
                keyboardType={"numeric"}
                onChangeText={(text) => changeHandler("mobile", text)}
                isHelper={errors.mobile ? true : false}
                errorMsg={errors?.mobile}
                helperType={'error'}
              />
            </View>
            <View pointerEvents={isLoading ? "none" : "auto"}>
              <Input
                placeholder={"Email"}
                label={"Email"}
                isLabel={false}
                name={'email'}
                icons={'envelope'}
                value={user.email}
                secureTextEntry={false}
                autoFocus={false}
                onChangeText={(text) => changeHandler("email", text)}
                isHelper={errors.email ? true : false}
                errorMsg={errors?.email}
                helperType={'error'}
              />
            </View>
            <View pointerEvents={isLoading ? "none" : "auto"}>
              <Input
                placeholder={"Password"}
                label={"Password"}
                isLabel={false}
                name={'password'}

                icons={'lock'}
                value={user.password}
                secureTextEntry={!passwordPressIn}
                rightIcon={passwordPressIn?'eye':'eye-slash'}
                rightIconHandler={rightIconHandler}
                autoFocus={false}
                onChangeText={(text) => changeHandler("password", text)}
                isHelper={errors.password ? true : false}
                errorMsg={errors?.password}
                helperType={'error'}
              />
            </View>
            <View pointerEvents={isLoading ? "none" : "auto"}>
              <Input
                placeholder={"Confirm Password"}
                label={"Confirm Password"}
                isLabel={false}
                name={'confirmPassword'}
                icons={'lock'}
                value={user.confirmPassword}
                secureTextEntry={true}
                autoFocus={false}
                onChangeText={(text) => changeHandler("confirmPassword", text)}
                isHelper={errors.confirmPassword ? true : false}
                errorMsg={errors?.confirmPassword}
                helperType={'error'}
              />
            </View></>}
          <View style={{ width: '100%' }}>
            <View style={{ width: "auto", alignItems: 'center' }}>
              <Button isLoading={isLoading} onPress={submitHandler} title={isForgotPassword?"Continue":"Sign up"}/>
            </View>
            <View style={{ position: 'relative', height: 30 }}>
              <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                  <Text style={{ fontSize: 16, color: backgroundStyle.color }}>{isForgotPassword?"Don't want to rest password?":"Already have an account?"} </Text><Text onPress={() => navigation.navigate('Login')} style={{ color: colors.text, fontSize: 16, fontWeight: 600, textDecorationLine: 'underline' }}>Login</Text>
                </View>
              </View>
            </View>
          </View>
          </ScrollView>
        </View>
  )
}

export default Signup


const styles = StyleSheet.create({
  signupContainer: {
    paddingHorizontal: 20,
    flex: 1
  },
  arrowBack: {
    paddingVertical: 20,
  },
  pageTitle: {
    paddingVertical: 10
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '600',
  },
  subHeaderTitle: {},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
    width: "100%",
    marginVertical: 15
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});
