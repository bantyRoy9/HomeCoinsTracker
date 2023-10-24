import { Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StatusBar } from 'react-native';
import Input from '../../Components/Input';
import { darkColorProps, lightColorProps } from '../../Utils/colorProp';
import Icons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { createUser } from '../../Redux/Action/userAction';
import { showAlert } from '../../Utils/CommonAuthFunction';
import { useTheme } from 'react-native-paper';

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text
  };
  const btnStyle = {
    backgroundColor: colors.btnBackground,
    color: colors.btnBackground
  }
  const [user, setUser] = useState({ name:"",email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const changeHandler = (key, value) => {
    updateErrors(key);
    setUser({ ...user, [key]: value })
  };

  const updateErrors = (key) =>{
    if(errors[key]){
      delete errors[key]
    };
    setErrors(errors);
  };
  const validateForm = () => {
    let valid = true,error={};
    if(!user.name){
      valid =false;
      error.name = '*Enter your full name'
    };
    if(!user.email){
      valid =false;
      error.email = '*Enter valid email'
    };
    if(!user.mobile){
      valid =false;
      error.mobile = '*Enter valid mobile no'
    };
    if(!user.password){
      valid = false;
      error.password = '*Enter password'
    }
    if(!user.confirmPassword){
      valid = false;
      error.password = '*Enter password';
      if(user.password !== user.confirmPassword){
        valid = false;
        error.password = '*Confirm password should be match with password';
      }
    }
    setErrors(error);
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      if(validateForm()){
        dispatch(createUser(user));
      };
    } catch (err) {
      showAlert(err);
    };
  };

  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={colors.text} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={styles.signupContainer}>
          <View style={styles.arrowBack}>
            <Icons name='arrow-back' size={30} onPress={() => navigation.navigate('Login')} color={colors.text} />
          </View>
          <View style={styles.pageTitle}>
            <Text style={{...styles.headerTitle,color:colors.text}}>Create Account</Text>
            <Text style={{...styles.subHeaderTitle,color:colors.text}}>Please fill the input below here</Text>
          </View>
          <ScrollView contentContainerStyle={{flex:1}} showsVerticalScrollIndicator={false}>
          <View>
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
          <View>
            <Input
              placeholder={"Phone"}
              label={"Phone"}
              isLabel={false}
              name={'mobile'}
              icons={'phone'}
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
          <View>
            <Input
              placeholder={"Email"}
              label={"Email"}
              isLabel={false}
              name={'email'}
              icons={'envelope-o'}
              value={user.email}
              secureTextEntry={false}
              autoFocus={false}
              onChangeText={(text) => changeHandler("email", text)}
              isHelper={errors.email ? true : false}
              errorMsg={errors?.email}
              helperType={'error'}
            />
          </View>
          <View>
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
              isHelper={errors.email ? true : false}
              errorMsg={errors?.email}
              helperType={'error'}
            />
          </View>
          <View>
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
          </ScrollView>
          <View style={{width:'100%'}}>
          <View style={{ width: "auto", alignItems: 'center' }}>
            <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler}>
              <Text style={{ ...styles.text, ...btnStyle.color }}>{"SIGN UP"}</Text>
            </Pressable>
          </View>
          <View style={{ position: 'relative', height: 30 }}>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ fontSize: 16, color: backgroundStyle.color }}>Allready have an accounts? </Text><Text onPress={() => navigation.navigate('Login')} style={{ color: btnStyle.color, fontSize: 16, fontWeight: 600, textDecorationLine: 'underline' }}>Login</Text>
              </View>
            </View>
          </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
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
    borderRadius: 50,
    elevation: 3,
    width: "70%",
    marginVertical: 15
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});
